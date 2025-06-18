<script lang="ts" generics="Item extends { id: any }">
	import type { Snippet } from 'svelte';
	import adminApiClient from '$lib/util/adminApiClient';
    import type { GetAllResults } from '$lib/util/adminApiClient';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import type { WithoutID } from '$lib/types/crud/globalCrud';
	import type { ActionReturn } from 'svelte/action';
	import { dragHandleZone, type Options } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	type ItemWithoutID = WithoutID<Item>;

    // Props

    type DndListContainerActionOptions = Omit<Options<Item>, 'items'>

	interface ListContainerRenderProps {
		children: Snippet;
		openCreateForm: () => void;
		reorder: (order: number[]) => void;
		updateAll: (items: ItemWithoutID[]) => void;
        /**
         * Use as a svelte action to make a container's items draggable to reorder them. Example usage:
         * ```svelte
         * <div use:draggableContainer>
         *   {#each items as item (item.id)}
         *     <div class="draggable-item" use:dragHandle> <!-- Use dragHandle as the handle for the draggable item -->
         *        <!-- Render item here -->
         *     </div>
         *  {/each}
         * </div>
         * ```
         * @param node
         */
        dndListContainer: (node: HTMLElement, options?: DndListContainerActionOptions) => ActionReturn<DndListContainerActionOptions, any>;
	}

	interface ItemRenderProps {
		id: Item['id']; // Unique identifier, copied from the item's id
		item: Item;
		index: number;
        openEditFrom: () => void;
		duplicate: () => void;
		remove: () => void;
	}

    interface EditModalRenderProps {
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
		renderListContainer?: Snippet<[ListContainerRenderProps]>;
        /**
         * Function to render each item in the list.
        */
       renderItem: Snippet<[ItemRenderProps]>;
        /**
         * The form thats used to create or edit an item.
         */
        editForm?: Snippet<[EditModalRenderProps]>;

		canCreate?: boolean;
		canDuplicate?: boolean;
		canUpdate?: boolean;
		canRemove?: boolean;

		order: {
            /**
             * Allow reordering of items in the list.
             * To allow drag-and-drop reordering, also use the `draggableContainer` action provided in the `children` render props.
             */
			canReorder: true
			/**
			 * The initial order of the items. If undefined, this will be auto-generated based on the initial items passed in.
			 */
			initialOrder?: Item['id'][];
		} | {
            canReorder: false|undefined
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

        renderListContainer,
        renderItem,
        editForm,

		canCreate = true,
		canDuplicate = true,
		canUpdate = true,
		canRemove = true,

		order: orderSettings
	}: Props = $props();

	const notificationContext = getNotificationContext();

	let order: Item['id'][] | undefined = $state(
		orderSettings.canReorder ? sanitizeOrder(orderSettings.initialOrder || items.map((item) => item.id)) : undefined
	);

    let visualItems: Item[] = $state(sort(items));
    $effect.pre(() => {
        visualItems = sort(items); // Reset visualItems when items change
    });

    $inspect("items", items)
    $inspect("visualItems", visualItems)

    let createModalOpen = $state(false); // Used to open the create modal for an item
    let editModalId: Item['id'] | undefined = $state(undefined); // Used to open the edit modal for an item

    // Actions

	function create(item: ItemWithoutID) {
		if (!canCreate) return;

		adminApiClient.create<Item>(serviceId, item)
            .then(updateItemsFromServerRes)
            .catch(onHttpError);
	}

	function duplicate(id: Item['id']) {
		if (!canDuplicate) return;

		const item = items.find((item) => item.id === id);
		if (item === undefined) return;
		delete item.id; // Remove the id to create a new item

		adminApiClient.create<Item>(serviceId, item)
            .then(updateItemsFromServerRes)
            .catch(onHttpError);
	}

	function update(id: Item['id'], item: ItemWithoutID) {
		if (!canUpdate) return;

		const index = items.findIndex((i) => i.id === id);
		if (index === -1) return;

		// We can update it immediately, as the server will return the updated item
		items[index] = { ...item, id: id } as Item;
        items = items; // Force reactivity

		adminApiClient.update<Item>(serviceId, id, item).then((res) => {
			// Update the item with the result from the server, in case it was modified
			const index = items.findIndex((i) => i.id === id);
			if (index === -1) return;
			items[index] = res.result;
		}).catch((err) => {
			onHttpError(err);
			refetch(); // Re-fetch the items to ensure they are in sync
		});
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

		adminApiClient.remove<Item>(serviceId, id).catch((err) => {
			onHttpError(err);
			refetch(); // Re-fetch the items to ensure they are in sync
		});
	}

	function updateAll(newItems: ItemWithoutID[]) {
		adminApiClient.overwriteAll<Item>(serviceId, newItems).then(updateItemsFromServerRes).catch((err) => {
			onHttpError(err);
			refetch(); // Re-fetch the items to ensure they are in sync
		});
	}

    function reorder(newOrder: Item['id'][]) {
		if (!orderSettings.canReorder) return;

		// Make sure the new order is valid
		newOrder = sanitizeOrder(newOrder);

		order = newOrder;

		adminApiClient.reorder<Item>(serviceId, newOrder).then((res) => {
			order = res.order;
		}).catch(onHttpError);
	}

    // Utils

    /**
     * Re-fetches the items from the server and updates the local state.
     */
	function refetch() {
		adminApiClient.getAll<Item>(serviceId)
            .then(updateItemsFromServerRes)
            .catch(onHttpError);
	}

    /**
     * Updates the local items and order from the server response.
     * @param res - The response from the server containing the items and possibly order.
     */
    function updateItemsFromServerRes(res: GetAllResults<Item>) {
        items = res.results;
        if (orderSettings.canReorder && res.order) order = res.order;
    }

    function onHttpError(err: Error) {
		notificationContext.show(err.message, 'error');
	}

	function sort(_items: Item[]) {
		if (orderSettings.canReorder) return [..._items].sort((a, b)=>order!.indexOf(a.id) - order!.indexOf(b.id));
		else if (orderSettings.sortFn) return [..._items].sort(orderSettings.sortFn);
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

    // Dnd List Container Action
    // Proxies the dragHandleZone action from svelte-dnd-action library to include the items array for you

    function dndListContainer(node: HTMLElement, options: DndListContainerActionOptions = {}): ActionReturn<DndListContainerActionOptions, any> {
        function onConsider(e: CustomEvent<{ items: Item[] }>) {
            // Update the items in the action
            visualItems = e.detail.items;
            console.log("Considered items:", visualItems);
        }
        function onFinalize(e: CustomEvent<{ items: Item[] }>) {
            // Update the items in the action
            visualItems = e.detail.items;

            // Call the reorder function with the new order
            reorder(e.detail.items.map((item) => item.id));
        }
        node.addEventListener('consider', onConsider as EventListener);
        node.addEventListener('finalize', onFinalize as EventListener);

        const addedOptions = {
            items: visualItems,
            flipDurationMs: 300,
            type: 'items',
            dropTargetStyle: {},
        };
        
        const { update, destroy } = dragHandleZone(node, {
            ...addedOptions,
            ...options
        });

        return {
            update: (newOptions: DndListContainerActionOptions) => {
                // Update the action with new options
                update?.({
                    ...addedOptions,
                    ...newOptions
                });
            },
            destroy: () => {
                node.removeEventListener('consider', onConsider as EventListener);
                node.removeEventListener('finalize', onFinalize as EventListener);
                destroy?.();
            }
        };
    }
</script>

{#snippet itemList()}
    {#each visualItems as item, index (item.id)}
        <div animate:flip={{ duration: 300 }}>
            {@render renderItem?.({
                id: item.id,
                item,
                index: index,
                openEditFrom: () => editModalId = item.id, // Open the edit modal for this item
                duplicate: () => canDuplicate ? duplicate(item.id) : () => {}, // Duplicate the item
                remove: () => canRemove ? remove(item.id) : () => {} // Remove the item
            })}
        </div>
    {/each}
{/snippet}



{#if renderListContainer}
    {@render renderListContainer?.({
        children: itemList,
        openCreateForm: canCreate ? () => createModalOpen = true : () => {}, // Open the create modal
        reorder,
        updateAll,
        dndListContainer
    })}
{:else}
    {@render itemList()}
{/if}

{#if editModalId !== undefined}
    {@render editForm?.({
        item: JSON.parse(JSON.stringify(items.find((item) => item.id === editModalId))), // Deep clone the item to avoid mutating the original item
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