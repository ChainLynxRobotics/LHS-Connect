<script lang="ts">
	import type { IBulletinBoardNote } from '$lib/types/crud/bulletinBoard';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import SvelteMarkdown from 'svelte-markdown';

	interface Props {
		note: IBulletinBoardNote;
	}

	let { note }: Props = $props();
</script>

<div
	class="flex overflow-hidden rounded-xl border bg-gray-50 shadow-lg dark:border-gray-700 dark:bg-gray-800"
>
	<div class="w-full p-4">
		<h2 class="markdown text-lg font-semibold">
			<SvelteMarkdown source={note.title} />
		</h2>
		<div class="markdown leading-tight text-gray-700 dark:text-gray-400">
			<SvelteMarkdown source={note.content} />
		</div>
	</div>
	{#if note.link}
		<a class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 transition hover:bg-gray-100 dark:hover:bg-gray-700" target="_blank" rel="noopener noreferrer" href={note.link}>
			<ChevronRightOutline size="xl" />
		</a>
	{/if}
</div>
