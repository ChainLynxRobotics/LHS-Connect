<script lang="ts" module>
	export type DraggableItem<A> = {
		id: number;
		data: A;
	};
</script>

<script lang="ts" generics="A">
	import { flip } from 'svelte/animate';
	import type { HTMLAttributes } from 'svelte/elements';
	import { dragHandleZone, type Options } from 'svelte-dnd-action';
	import type { Snippet } from 'svelte';

	interface Props {
		items?: A[];
		update?: (items: A[]) => void;
		flipDurationMs?: number;
		dragZoneType?: string;
		dragZoneOptions?: Partial<Options<DraggableItem<A>>>;
		sectionElement?: string;
		sectionClass?: string;
		sectionProps?: HTMLAttributes<HTMLElement>;
		dragWrapperElement?: string;
		dragWrapperClass?: string;
		dragWrapperProps?: HTMLAttributes<HTMLElement>;
		children?: Snippet<[{ item: A; index: number }]>;
	}

	let {
		items = [],
		update = () => {},
		flipDurationMs = 300,
		dragZoneType = '',
		dragZoneOptions = {},
		sectionElement = 'section',
		sectionClass = '',
		sectionProps = {},
		dragWrapperElement = 'div',
		dragWrapperClass = '',
		dragWrapperProps = {},
		children
	}: Props = $props();

	let visualItems: DraggableItem<A>[] = $state([]);
	$effect(() => {
		visualItems = items.map((data, i) => ({ id: Date.now() + i, data }));
	});

	function handleDndConsider(e: CustomEvent<{ items: DraggableItem<A>[] }>) {
		visualItems = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<{ items: DraggableItem<A>[] }>) {
		visualItems = e.detail.items;
		// Check if order has changed before updating state and history
		let changed = visualItems.length !== items.length; // If the length is different, then the order has changed, if they are not continue with the array comparison
		for (let i = 0; i < e.detail.items.length && !changed; i++) {
			if (visualItems[i].data !== items[i]) {
				changed = true;
			}
		}
		if (changed) update(visualItems.map((item) => item.data)); // Update the actual state now that its finalized
	}
</script>

<svelte:element
	this={sectionElement}
	use:dragHandleZone={{
		items: visualItems,
		flipDurationMs,
		type: dragZoneType,
		dropTargetStyle: {},
		...dragZoneOptions
	}}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
	class={sectionClass}
	{...sectionProps}
>
	{#each visualItems as item (item.id)}
		<svelte:element
			this={dragWrapperElement}
			animate:flip={{ duration: flipDurationMs }}
			class={dragWrapperClass}
			{...dragWrapperProps}
		>
			{@render children?.({ item: item.data, index: items.findIndex((i) => i === item.data) })}
		</svelte:element>
	{/each}
</svelte:element>
