<script lang="ts" generics="Item extends {}, Sortable">
	import { generateRandomId } from '$lib/util/randomId';
	import type { Snippet } from 'svelte';

    type ItemWithId = Item & { id: number };

    interface ListDisplayProps {
        items: ItemDisplayProps[];
        create: () => void;
        reorder: (order: number[]) => void;
    }

    interface ItemDisplayProps {
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
        listDisplay: Snippet<[ListDisplayProps]>;
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
        listDisplay,
        canCreate = true,
        canDuplicate = true,
        canUpdate = true,
        canRemove = true,

        canReorder = false,
        initialOrder,
        sortFn
    }: Props = $props();

    let items: ItemWithId[] = $state(initialItems);
    let order: number[] = $state(initialOrder ?? []);

    function create() {
        if (!canCreate) return;

        items.push({...generateNewItem(), id: generateRandomId()});
        items = items; // Force reactivity
    }

    function duplicate(id: number) {
        if (!canDuplicate) return;

        const index = items.findIndex(item => item.id === id);
        if (index === -1) return;

        const clonedItem = JSON.parse(JSON.stringify(items[index]))
        items.splice(index + 1, 0, {...clonedItem, id: generateRandomId()});
        items = items; // Force reactivity
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
    }

    function sort(_items: ItemWithId[]) {
        if (canReorder) return order.map(i => items[i]);
        else if (sortFn) return [..._items].sort(sortFn);
        else return _items;
    }

    function reorder(newOrder: number[]) {
        if (!canReorder) return;

        // Make sure the new order is valid
        newOrder = newOrder
            .filter((item, pos, self) => self.indexOf(item) == pos)  // Remove duplicates
            .filter(id => items.findIndex(i => i.id === id) !== -1); // Ensure all ids in "newOrder" are present in "items"
        if (items.some(i => newOrder.indexOf(i.id) === -1)) return;  // Ensure all items have an id in "newOrder"

        order = newOrder;
    }
</script>

{@render listDisplay({
    items: sort(items).map((_item, index) => ({
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