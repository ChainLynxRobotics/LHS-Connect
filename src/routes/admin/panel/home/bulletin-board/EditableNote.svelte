<script lang="ts">
	import BoardNoteContent from '$components/info/BoardNoteContent.svelte';
	import type { Note } from '$lib/types/HomePageData';
	import { Modal } from 'flowbite-svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { dragHandle } from 'svelte-dnd-action';
	import EditNoteForm from './EditNoteForm.svelte';

	interface Props {
		note: Note;
		onEdit: (e: Note) => void;
		onDuplicate: () => void;
		onDelete: () => void;
	}

	let { note, onEdit: edit, onDuplicate: duplicate, onDelete: _delete }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(_note: Note) {
		edit(_note);
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
		<button title="Edit" onclick={() => (editModalOpen = true)} class="!p-2"
			><EditOutline class="h-6 w-6" /></button
		>
		<button title="Duplicate" onclick={duplicate} class="!p-2"
			><FileCopyOutline class="h-6 w-6" /></button
		>
		<button title="Delete" onclick={_delete} class="!p-2"
			><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
		>
	</div>
</div>

<Modal bind:open={editModalOpen} size="md" autoclose={false}>
	<EditNoteForm
		{note}
		onSubmit={handleEditModalSubmit}
		onCancel={() => (editModalOpen = false)}
	/>
</Modal>
