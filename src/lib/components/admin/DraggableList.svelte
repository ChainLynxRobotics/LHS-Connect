<script lang="ts" generics="Item extends { id: number }">
	import { flip } from 'svelte/animate';
	import type { HTMLAttributes } from 'svelte/elements';
	import { dragHandleZone, type Options } from 'svelte-dnd-action';
	import type { Snippet } from 'svelte';

	interface Props {
		items?: Item[];
		updateOrder?: (order: number[]) => void;
		flipDurationMs?: number;
		dragZoneType?: string;
		dragZoneOptions?: Partial<Options<Item>>;
		sectionElement?: string;
		sectionClass?: string;
		sectionProps?: HTMLAttributes<HTMLElement>;
		dragWrapperElement?: string;
		dragWrapperClass?: string;
		dragWrapperProps?: HTMLAttributes<HTMLElement>;
		item?: Snippet<[Item, number]>;
	}

	let {
		items = [],
		updateOrder,
		flipDurationMs = 300,
		dragZoneType = '',
		dragZoneOptions = {},
		sectionElement = 'section',
		sectionClass = '',
		sectionProps = {},
		dragWrapperElement = 'div',
		dragWrapperClass = '',
		dragWrapperProps = {},
		item
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
		updateOrder?.(e.detail.items.map((item) => item.id));
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
	{#each visualItems as _item, index (_item.id)}
		<svelte:element
			this={dragWrapperElement}
			animate:flip={{ duration: flipDurationMs }}
			class={dragWrapperClass}
			{...dragWrapperProps}
		>
			{@render item?.(_item, index)}
		</svelte:element>
	{/each}
</svelte:element>
