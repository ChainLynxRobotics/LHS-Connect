<script lang="ts">
	import BoardNoteContent from '$components/info/BoardNoteContent.svelte';
	import { Modal } from 'flowbite-svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { dragHandle } from 'svelte-dnd-action';
	import EditableNoteForm from './EditableNoteForm.svelte';
	import type { WithoutID } from '$lib/types/crud/globalCrud';
	import type { IBulletinBoardNote } from '$lib/types/crud/bulletinBoard';

	interface Props {
		note: IBulletinBoardNote;
		onUpdate: (e: WithoutID<IBulletinBoardNote>) => void;
		onDuplicate: () => void;
		onRemove: () => void;
	}

	let { note, onUpdate, onDuplicate, onRemove }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(_note: WithoutID<IBulletinBoardNote>) {
		onUpdate(_note);
		editModalOpen = false;
	}
</script>

<div class="flex w-full items-start gap-2">
	<div use:dragHandle class="w-full">
		<BoardNoteContent {note} />
	</div>
	<div class="flex flex-col">
		<button title="Edit" onclick={() => (editModalOpen = true)} class="!p-2"
			><EditOutline class="h-6 w-6" /></button
		>
		<button title="Duplicate" onclick={onDuplicate} class="!p-2"
			><FileCopyOutline class="h-6 w-6" /></button
		>
		<button title="Delete" onclick={onRemove} class="!p-2"
			><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
		>
	</div>
</div>

<Modal bind:open={editModalOpen} size="md" autoclose={false}>
	<EditableNoteForm
		{note}
		onSubmit={handleEditModalSubmit}
		onCancel={() => (editModalOpen = false)}
	/>
</Modal>
