<script lang="ts">
	import BoardNoteContent from '$components/info/BoardNoteContent.svelte';
	import type { Note } from '$lib/types/HomePageData';
	import { Modal } from 'flowbite-svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import EditNoteForm from './EditNoteForm.svelte';

	export let note: Note;

	const dispatch = createEventDispatcher<{
		edit: Note;
		duplicate: null;
		delete: null;
	}>();

	let editModalOpen = false;

	function handleEditModalSubmit(e: CustomEvent<Note>) {
		dispatch('edit', e.detail);
		editModalOpen = false;
	}
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
		<button title="Edit" on:click={() => (editModalOpen = true)} class="!p-2"
			><EditOutline class="h-6 w-6" /></button
		>
		<button title="Duplicate" on:click={() => dispatch('duplicate')} class="!p-2"
			><FileCopyOutline class="h-6 w-6" /></button
		>
		<button title="Delete" on:click={() => dispatch('delete')} class="!p-2"
			><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
		>
	</div>
</div>

<Modal bind:open={editModalOpen} size="md" autoclose={false}>
	<EditNoteForm
		{note}
		on:submit={handleEditModalSubmit}
		on:cancel={() => (editModalOpen = false)}
	/>
</Modal>
