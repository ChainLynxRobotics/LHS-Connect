<script lang="ts" generics="Item extends {}">
	import { generateRandomId } from '$lib/util/randomId';
	import type { Snippet } from 'svelte';

    type ItemWithId = Item & { id: number };

    interface ItemListDisplayProps {
        items: ItemDisplayProps[];
        create: () => void;
        reorder: (order: number[]) => void;
    }

    interface ItemDisplayProps {
        id: number; // Unique identifier, copied from the item's id
        item: ItemWithId;
        index: number;
        create: () => void;
        duplicate: () => void;
        update: (item: Item) => void;
        remove: () => void;
    }

    interface BaseProps {
        initialItems: ItemWithId[];
        generateNewItem: () => Item;
        items: Snippet<[ItemListDisplayProps]>;
        canCreate?: boolean;
        canDuplicate?: boolean;
        canUpdate?: boolean;
        canRemove?: boolean;

        canReorder?: boolean;
        sortFn?: (a: ItemWithId, b: ItemWithId) => number;
        initialOrder?: number[];
    }

    type Props = BaseProps & ({
        canReorder: false;
    } | {
        canReorder: true;
        initialOrder: number[]; // Required if canReorder is true
    });

    let {
        initialItems,
        generateNewItem,
        items: itemsSnippet,
        canCreate = true,
        canDuplicate = true,
        canUpdate = true,
        canRemove = true,

        canReorder = false,
        initialOrder,
        sortFn
    }: Props = $props();

    let items: ItemWithId[] = $state(initialItems);
    let order: number[]|undefined = $state(canReorder ? sanitizeOrder(initialOrder!) : undefined);

    function create() {
        if (!canCreate) return;

        const newId = generateRandomId();
        items.push({...generateNewItem(), id: newId});
        items = items; // Force reactivity

        if (canReorder) {
            order!.push(newId); // Keep order in sync
            order = order; // Force reactivity
        }
    }

    function duplicate(id: number) {
        if (!canDuplicate) return;

        const item = items.find(item => item.id === id);
        if (item === undefined) return;

        const clonedItem = JSON.parse(JSON.stringify(item));
        const newId = generateRandomId();
        items.push({...clonedItem, id: newId}); // Can add to the end, because the order doesn't matter here
        items = items; // Force reactivity

        if (canReorder) {
            const index = order!.indexOf(id);
            order!.splice(index + 1, 0, newId); // Keep order in sync
            order = order; // Force reactivity
        }
    }

    function update(id: number, item: Item) {
        if (!canUpdate) return;

        const index = items.findIndex(i => i.id === id);
        if (index === -1) return;

        items[index] = { ...item, id: id };
    }

    function remove(id: number) {
        if (!canRemove) return;

        const index = items.findIndex(item => item.id === id);
        if (index === -1) return;

        items.splice(index, 1);
        items = items; // Force reactivity

        if (canReorder) {
            order!.splice(order!.indexOf(id), 1); // Keep order in sync
            order = order; // Force reactivity
        }
    }

    function sort(_items: ItemWithId[]) {
        if (canReorder) return order!.map(id => items.find(i => i.id === id)!);
        else if (sortFn) return [..._items].sort(sortFn);
        else return _items;
    }

    function reorder(newOrder: number[]) {
        if (!canReorder) return;

        // Make sure the new order is valid
        newOrder = sanitizeOrder(newOrder);

        order = newOrder;
    }

    function sanitizeOrder(newOrder: number[]) {
        newOrder = newOrder
            .filter((item, pos, self) => self.indexOf(item) == pos)  // Remove duplicates
            .filter(id => items.findIndex(i => i.id === id) !== -1); // Ensure all ids in "newOrder" are present in "items"
        if (items.some(i => newOrder.indexOf(i.id) === -1)) throw new Error("Invalid CRUD order of items");  // Ensure all items have an id in "newOrder"
        return newOrder;
    }
</script>

{@render itemsSnippet({
    items: sort(items).map((_item, index) => ({
        id: _item.id,
        item: _item,
        index,
        create,
        duplicate: () => duplicate(_item.id),
        update: (item: Item) => update(_item.id, item),
        remove: () => remove(_item.id)
    })),
    create,
    reorder
})}