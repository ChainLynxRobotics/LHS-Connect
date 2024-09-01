<script lang="ts">
	import BoardNoteContent from '$components/BoardNoteContent.svelte';
	import type { Note } from '$lib/types/HomePageData';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { dragHandle } from 'svelte-dnd-action';

	export let note: Note;

	const dispatch = createEventDispatcher<{
		editButtonClick: null;
		duplicateButtonClick: null;
		deleteButtonClick: null;
	}>();
</script>

<div class="flex w-full items-start gap-2">
	<div use:dragHandle class="w-full">
		{#if note.link}
			<a href={note.link} target="_blank" rel="noopener noreferrer">
				<BoardNoteContent {note} />
			</a>
		{:else}
			<BoardNoteContent {note} />
		{/if}
	</div>
	<div class="flex flex-col">
		<button title="Edit" on:click={() => dispatch('editButtonClick')} class="!p-2"
			><EditOutline class="h-6 w-6" /></button
		>
		<button title="Duplicate" on:click={() => dispatch('duplicateButtonClick')} class="!p-2"
			><FileCopyOutline class="h-6 w-6" /></button
		>
		<button title="Delete" on:click={() => dispatch('deleteButtonClick')} class="!p-2"
			><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
		>
	</div>
</div>
