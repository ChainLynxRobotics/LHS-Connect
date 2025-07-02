<script lang="ts">
	import dayjs from '$lib/util/dayjs';
	import { Tooltip } from 'flowbite-svelte';

	interface Props {
		title?: string;
		updatedAt?: string | { updatedAt: string }[];
	}

	let { title = '', updatedAt }: Props = $props();

	let updatedAtNormalized = $derived(
		typeof updatedAt === 'string'
			? dayjs(updatedAt) // If it's a string, convert it to a date
			: updatedAt // If it's an array, convert it to a date and get the most recent one
					?.filter((x) => x?.updatedAt)
					.map((x) => dayjs(x.updatedAt))
					.sort((a, b) => b.valueOf() - a.valueOf())[0]
	);
</script>

<div class="mb-4 flex items-end justify-between gap-2 border-b-4 border-red-500 text-2xl">
	<h3 class="flex-shrink-0 font-bold">{title}</h3>
	{#if updatedAtNormalized}
		<span class="pb-1 text-right text-xs italic text-gray-500 dark:text-gray-500"
			>Last updated {updatedAtNormalized.fromNow()}</span
		>
		<Tooltip>{updatedAtNormalized.format('llll')}</Tooltip>
	{/if}
</div>
