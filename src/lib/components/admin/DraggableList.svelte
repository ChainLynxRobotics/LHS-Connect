<script lang="ts" generics="Item extends { id: any }">
	import type { HTMLAttributes } from 'svelte/elements';
	import { dragHandleZone, type Options } from 'svelte-dnd-action';
	import type { Snippet } from 'svelte';
	import { flip } from 'svelte/animate';

	type Props = {
		items?: Item[];
		reorder?: (order: Item['id'][]) => void;
		flipDurationMs?: number;
		dragZoneType?: string;
		dragZoneOptions?: Partial<Options<Item>>;
		renderItem?: Snippet<[Item, number]>;

		wrapperElement?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
		wrapperProps?: HTMLAttributes<HTMLElement>;
	} & HTMLAttributes<HTMLElement>;

	let {
		items = [],
		reorder,
		flipDurationMs = 300,
		dragZoneType = '',
		dragZoneOptions = {},
		renderItem,
		wrapperElement = 'div',
		wrapperProps = {},
		...elementProps
	}: Props = $props();

	let visualItems = $state([...items]);
	$effect.pre(() => {
		visualItems = [...items]; // Reset visualItems when items change
	});

	function handleDndConsider(e: CustomEvent<{ items: Item[] }>) {
		visualItems = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<{ items: Item[] }>) {
		visualItems = e.detail.items;
		reorder?.(e.detail.items.map((item) => item.id));
	}
</script>

<div
	{...elementProps}
	use:dragHandleZone={{
		items: visualItems,
		flipDurationMs,
		type: dragZoneType,
		dropTargetStyle: {},
		...dragZoneOptions
	}}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
>
	{#each visualItems as item, index (item.id)}
		<svelte:element 
			this={wrapperElement} 
			{...wrapperProps} 
			animate:flip={{ duration: flipDurationMs }}
		>
			{@render renderItem?.(item, index)}
		</svelte:element>
	{/each}
</div>
