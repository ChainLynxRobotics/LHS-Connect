<script lang="ts" generics="Item extends { id: any }">
	import type { Snippet } from 'svelte';
	import adminApiClient from '$lib/util/adminApiClient';
    import type { GetAllResults } from '$lib/util/adminApiClient';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import type { WithoutID } from '$lib/types/basicTypes';
	
	type ItemWithoutID = WithoutID<Item>;

    // Props

	interface ItemListRenderProps {
		items: ItemRenderProps[];
		create: () => void; // Creates a new item and uploads it immediately
		openCreateForm: () => void; // Opens the create form, does not upload unless its submitted
		reorder: (order: Item['id'][]) => void;
		updateAll: (items: ItemWithoutID[]) => void;
	}

	interface ItemRenderProps {
		id: Item['id']; // Unique identifier, copied from the item's id
		item: Item;
		index: number;
        openEditFrom: () => void; // Opens the edit form for this item, does not upload unless its submitted
		update: (item: ItemWithoutID) => void; // Updates the item immediately, does not open the form
		duplicate: () => void;
		remove: () => void;
	}

    interface EditFormRenderProps {
        item: ItemWithoutID;
        onSubmit: (item: ItemWithoutID) => void;
        onCancel: () => void;
    }

	interface Props {
		/**
		 * The service ID to use for the api calls. Required.
		 */
		serviceId: string;
		/**
		 * The items to display in the list. Bindable. Must be stateful, so it can be updated.
		 */
		items: Item[];
		/**
		 * Function to generate a new item. Required if `canCreate` is true (which it defaults to).
         * Basically what is the default item to create when the user clicks "Create" button.
		 */
		generateNewItem?: () => ItemWithoutID;

        /**
         * Function to render the container with a `children` prop that contains the list of items. If not provided, it will just render the items as a list.
         */
		renderItems: Snippet<[ItemListRenderProps]>;
        /**
         * The form thats used to create or edit an item.
         */
        editForm?: Snippet<[EditFormRenderProps]>;

		canCreate?: boolean;
		canDuplicate?: boolean;
		canUpdate?: boolean;
		canRemove?: boolean;

		order: {
            /**
             * Allow reordering of items in the list.
             * To allow drag-and-drop reordering, also use the `draggableContainer` action provided in the `children` render props.
             */
			canReorder: true;
		} | {
            canReorder: false|undefined;
			/**
			 * When `canReorder` is false, use the following function to sort the items.
			 */
			sortFn?: (a: Item, b: Item) => number;
		}
	}

	let {
		serviceId,
		items = $bindable(),
		generateNewItem,

        renderItems,
        editForm,

		canCreate = true,
		canDuplicate = true,
		canUpdate = true,
		canRemove = true,

		order: orderSettings
	}: Props = $props();

	const notificationContext = getNotificationContext();

	let order: Item['id'][] | undefined = $state(
		orderSettings.canReorder ? sanitizeOrder(items.map((item) => item.id)) : undefined
	);

    let createModalOpen = $state(false); // Used to open the create modal for an item
    let editModalId: Item['id'] | undefined = $state(undefined); // Used to open the edit modal for an item

    // Actions

	function create(item: ItemWithoutID) {
		if (!canCreate) return;

		adminApiClient.create<Item>(serviceId, item)
            .catch(onHttpError);
	}

	function duplicate(id: Item['id']) {
		if (!canDuplicate) return;

		const item = items.find((item) => item.id === id);
		if (item === undefined) return;
		delete item.id; // Remove the id to create a new item

		adminApiClient.create<Item>(serviceId, item)
            .catch(onHttpError);
	}

	function update(id: Item['id'], item: ItemWithoutID) {
		if (!canUpdate) return;

		const index = items.findIndex((i) => i.id === id);
		if (index === -1) return;

		// We can update it immediately, as the server will return the updated item
		items[index] = { ...item, id: id } as Item;
        items = items; // Force reactivity

		adminApiClient.update<Item>(serviceId, id, item)
			.then((res) => {
				// Update the item with the result from the server, in case it was modified
				const index = items.findIndex((i) => i.id === id);
				if (index === -1) return;
				items[index] = res.result;
			})
			.catch(onHttpError);
	}

	function remove(id: Item['id']) {
		if (!canRemove) return;

		const index = items.findIndex((item) => item.id === id);
		if (index === -1) return;

		// We can update it immediately, as the server will return the updated list for sync
		items.splice(index, 1);
		items = items; // Force reactivity

		if (orderSettings.canReorder) {
			order!.splice(order!.indexOf(id), 1); // Keep order in sync
			order = order; // Force reactivity
		}

		adminApiClient.remove<Item>(serviceId, id)
			.catch(onHttpError);
	}

	function updateAll(newItems: ItemWithoutID[]) {
		adminApiClient.overwriteAll<Item>(serviceId, newItems)
			.then(updateItemsFromServerRes)
			.catch(onHttpError);
	}

    function reorder(newOrder: Item['id'][]) {
		if (!orderSettings.canReorder) return;

		// Make sure the new order is valid
		newOrder = sanitizeOrder(newOrder);
		order = newOrder;

        items = sort(items); // Sort the items based on the new order

		adminApiClient.reorder<Item>(serviceId, newOrder)
			.then((res) => {
				order = res.order;
			})
			.catch(onHttpError);
	}

    // Utils

    /**
     * Re-fetches the items from the server and updates the local state.
     */
	function refetch() {
		adminApiClient.getAll<Item>(serviceId)
            .then(updateItemsFromServerRes)
            .catch((err) => {
				console.error('Failed to refetch items:', err);
				notificationContext.show('Failed to refetch items', 'error');
			});
	}

    /**
     * Updates the local items and order from the server response.
     * @param res - The response from the server containing the items and possibly order.
     */
    function updateItemsFromServerRes(res: GetAllResults<Item>) {
        if (orderSettings.canReorder) order = items.map((item) => item.id);
        items = sort(res.results);
    }

    function onHttpError(err: Error) {
		refetch(); // Try to refetch the items to keep the state in sync
		notificationContext.show(err.message, 'error');
	}

	function sort(_items: Item[]) {
		if (orderSettings.canReorder) return _items.sort((a, b)=>order!.indexOf(a.id) - order!.indexOf(b.id));
		else if (orderSettings.sortFn) return _items.sort(orderSettings.sortFn);
        else return _items;
	}

	function sanitizeOrder(newOrder: Item['id'][]) {
		newOrder = newOrder
			.filter((item, pos, self) => self.indexOf(item) == pos) // Remove duplicates
			.filter((id) => items.findIndex((i) => i.id === id) !== -1); // Ensure all ids in "newOrder" are present in "items"
		if (items.some((i) => newOrder.indexOf(i.id) === -1))
			throw new Error('Invalid CRUD order of items'); // Ensure all items have an id in "newOrder"
		return newOrder;
	}
</script>


{@render renderItems({
    items: items.map((item, index) => ({
        id: item.id,
        item,
        index: index,
        openEditFrom: () => editModalId = item.id, // Open the edit modal for this item
		update: (_item: ItemWithoutID) => update(item.id, _item), // Update the item immediately
        duplicate: () => canDuplicate ? duplicate(item.id) : () => {}, // Duplicate the item
        remove: () => canRemove ? remove(item.id) : () => {} // Remove the item
    }) as ItemRenderProps),
	create: () => create(generateNewItem!()),
    openCreateForm: canCreate ? () => createModalOpen = true : () => {}, // Open the create modal
    reorder,
    updateAll,
})}

{#if editModalId !== undefined}
    {@render editForm?.({
        item: items.find((item) => item.id === editModalId) as ItemWithoutID,
        onSubmit: (item: ItemWithoutID) => {
            update(editModalId, item);
            editModalId = undefined; // Close the modal
        },
        onCancel: () => {
            editModalId = undefined; // Close the modal
        }
    })}
{/if}

{#if createModalOpen && editModalId === undefined}
    {@render editForm?.({
        item: generateNewItem!(),
        onSubmit: (item: ItemWithoutID) => {
            create(item);
            createModalOpen = false; // Close the modal
        },
        onCancel: () => {
            createModalOpen = false; // Close the modal
        }
    })}
{/if}