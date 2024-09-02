<script lang="ts" context="module">
    export type DraggableItem = {
        id: number;
        dataIndex: number;
    };
</script>

<script lang="ts" generics="A">
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";
	import { dragHandleZone } from "svelte-dnd-action";

    export let items: A[] = [];

    export let flipDurationMs = 300;

    export let sectionClass = "";
    export let sectionProps: HTMLAttributes<HTMLElement> = {};

    export let dragWrapperClass = "";
    export let dragWrapperProps: HTMLAttributes<HTMLElement> = {};


    let visualItems: DraggableItem[];
    visualItems = items.map((data, dataIndex) => ({ id: dataIndex, dataIndex }));

    function handleDndConsider(e: CustomEvent<{ items: DraggableItem[] }>) {
		visualItems = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<{ items: DraggableItem[] }>) {
		visualItems = e.detail.items;
		// Check if order has changed before updating state and history
        let changed = visualItems.length !== items.length; // If the length is different, then the order has changed, if they are not continue with the array comparison
        for (let i = 0; i < e.detail.items.length && !changed; i++) {
            if (items[visualItems[i].dataIndex] !== items[i]) {
                changed = true;
            }
        }
		if (changed) items = e.detail.items.map(item=>items[item.dataIndex]); // Update the actual state now that its finalized
        console.log(items);
	}

</script>

<section
	use:dragHandleZone={{ items: visualItems, flipDurationMs, dropTargetStyle: {} }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
    class={sectionClass}
    {...sectionProps}
>
    {#each visualItems as item (item.id)}
        {@const data = items[item.dataIndex]}
        <div animate:flip={{ duration: flipDurationMs }} class={dragWrapperClass} {...dragWrapperProps}>
            <slot item={data} index={item.dataIndex} />
        </div>
    {/each}
</section>