<script lang="ts">
	import BoardNoteContent from '$components/BoardNoteContent.svelte';
	import type { Note } from '$lib/types/HomePageData';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';

	export let note: Note;
</script>

<div class="w-full flex items-start gap-2">
	<div class="w-full">
		{#if note.link}
			<a href={note.link} target="_blank" rel="noopener noreferrer">
				<BoardNoteContent {note} />
			</a>
		{:else}
			<BoardNoteContent {note} />
		{/if}
	</div>
	<div class="flex flex-col">
		<button title="Edit" class="!p-2"><EditOutline class="w-6 h-6" /></button>
		<button title="Duplicate" class="!p-2"><FileCopyOutline class="w-6 h-6" /></button>
		<button title="Delete" class="!p-2"><TrashBinOutline class="w-6 h-6 text-red-500 dark:text-red-400" /></button>
	</div>
</div>
