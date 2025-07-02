<script lang="ts">
	import type { IBulletinBoardNote } from '$api/page_data/bulletinBoard/types';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	const plugins = [gfmPlugin()];

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
			<Markdown md={note.title} plugins={plugins} />
		</h2>
		<div class="markdown leading-tight text-gray-700 dark:text-gray-400">
			<Markdown md={note.content} plugins={plugins} />
		</div>
	</div>
	{#if note.link}
		<a class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 transition hover:bg-gray-100 dark:hover:bg-gray-700" target="_blank" rel="noopener noreferrer" href={note.link}>
			<ChevronRightOutline size="xl" />
		</a>
	{/if}
</div>
