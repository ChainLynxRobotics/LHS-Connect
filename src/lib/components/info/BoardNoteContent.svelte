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
	class="flex overflow-hidden rounded-xl border bg-gray-50 shadow-lg dark:border-gray-700 dark:bg-gray-800 {note.link &&
		'transition hover:bg-gray-100 dark:hover:bg-gray-700'}"
>
	<div class="w-full p-4">
		<h2 class="prose text-lg font-semibold">
			<SvelteMarkdown source={note.title} isInline />
		</h2>
		<div class="prose leading-tight text-gray-700 dark:text-gray-400">
			<SvelteMarkdown source={note.content} />
		</div>
	</div>
	{#if note.link}
		<div class="flex items-center p-2">
			<ChevronRightOutline size="xl" />
		</div>
	{/if}
</div>
