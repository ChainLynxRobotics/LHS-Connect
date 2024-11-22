<script lang="ts" generics="Item extends { id: any }">
	import { generateRandomId } from '$lib/util/randomId';
	import type { Snippet } from 'svelte';

	type ItemWithoutID = Omit<Item, 'id'>;

	interface ItemListDisplayProps {
		items: ItemDisplayProps[];
		create: () => void;
		reorder: (order: number[]) => void;
		updateAll: (items: Item[], newOrder?: number[]) => void;
	}

	interface ItemDisplayProps {
		id: Item['id']; // Unique identifier, copied from the item's id
		item: Item;
		index: number;
		duplicate: () => void;
		update: (item: ItemWithoutID) => void;
		remove: () => void;
	}

	interface Props {
		/**
		 * The service ID to use for the api calls. Required.
		 */
		serviceId: string;
		/**
		 * The items to display in the list. Bindable.
		 */
		items: Item[];
		/**
		 * Function to generate a new item. Required if `canCreate` is true (which it defaults to).
		 */
		generateNewItem?: () => ItemWithoutID;
		renderItems?: Snippet<[ItemListDisplayProps]>;
		canCreate?: boolean;
		canDuplicate?: boolean;
		canUpdate?: boolean;
		canRemove?: boolean;

		canReorder?: boolean;
		sortFn?: (a: Item, b: Item) => number;
		/**
		 * The initial order of the items. This is required if `canReorder` is true.
		 */
		initialOrder?: Item['id'][];
	}

	let {
		serviceId,
		items: initialItems = $bindable([]),
		generateNewItem,
		renderItems,
		canCreate = true,
		canDuplicate = true,
		canUpdate = true,
		canRemove = true,

		canReorder = false,
		initialOrder,
		sortFn
	}: Props = $props();

	let items: Item[] = $state(initialItems);
	$effect(() => {
		initialItems = sort(items); // Sync the prop with the state
	});

	let order: Item['id'][] | undefined = $state(
		canReorder && initialOrder ? sanitizeOrder(initialOrder) : undefined
	);

	function create() {
		if (!canCreate) return;
		if (!generateNewItem) throw new Error('Missing generateNewItem function');

		const newId = generateRandomId();
		const newItem = generateNewItem();

		items.push({ ...newItem, id: newId } as Item);
		items = items; // Force reactivity

		fetch(`/api/${serviceId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newItem)
		}).then(res=>res.json()).then(res=>items = res.results);

		if (canReorder) {
			order!.push(newId); // Keep order in sync
			order = order; // Force reactivity
		}
	}

	function duplicate(id: Item['id']) {
		if (!canDuplicate) return;

		const item = items.find((item) => item.id === id);
		if (item === undefined) return;

		const clonedItem = JSON.parse(JSON.stringify(item));
		const newId = generateRandomId();
		items.push({ ...clonedItem, id: newId });
		items = items; // Force reactivity

		if (canReorder) {
			const index = order!.indexOf(id);
			order!.splice(index + 1, 0, newId); // Keep order in sync
			order = order; // Force reactivity
		}
	}

	function update(id: Item['id'], item: ItemWithoutID) {
		if (!canUpdate) return;

		const index = items.findIndex((i) => i.id === id);
		if (index === -1) return;

		items[index] = { ...item, id: id } as Item;
	}

	function remove(id: Item['id']) {
		if (!canRemove) return;

		const index = items.findIndex((item) => item.id === id);
		if (index === -1) return;

		items.splice(index, 1);
		items = items; // Force reactivity

		if (canReorder) {
			order!.splice(order!.indexOf(id), 1); // Keep order in sync
			order = order; // Force reactivity
		}
	}

	function updateAll(newItems: Item[], newOrder?: Item['id'][]) {
		items = newItems;

		if (canReorder) {
			if (!newOrder) throw new Error('Missing order when updating all items');
			order = sanitizeOrder(newOrder!); // Ensure the order is still valid
		}
	}

	function sort(_items: Item[]) {
		if (canReorder) return order!.map((id) => items.find((i) => i.id === id)!);
		else if (sortFn) return [..._items].sort(sortFn);
		else return _items;
	}

	function reorder(newOrder: Item['id'][]) {
		if (!canReorder) return;

		// Make sure the new order is valid
		newOrder = sanitizeOrder(newOrder);

		order = newOrder;
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

{@render renderItems?.({
	items: sort(items).map(
		(_item, index) =>
			({
				id: _item.id,
				item: _item,
				index,
				duplicate: () => duplicate(_item.id),
				update: (item: ItemWithoutID) => update(_item.id, item),
				remove: () => remove(_item.id)
			}) as ItemDisplayProps
	),
	create,
	reorder,
	updateAll
})}
