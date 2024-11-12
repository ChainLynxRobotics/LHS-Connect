<script lang="ts">
	import LinkCardContent from '$components/info/LinkCardContent.svelte';
	import type { LinkCard } from '$lib/types/HomePageData';
	import { Modal } from 'flowbite-svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { dragHandle } from 'svelte-dnd-action';
	import EditLinkCardForm from './EditLinkCardForm.svelte';

	interface Props {
		card: LinkCard;
		onEdit: (e: LinkCard) => void;
		onDuplicate: () => void;
		onDelete: () => void;
	}

	let { card, onEdit: edit, onDuplicate: duplicate, onDelete: _delete }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(e: LinkCard) {
		edit(e)
		editModalOpen = false;
	}
</script>

<div class="flex items-start gap-2">
	<div use:dragHandle>
		<LinkCardContent {card} />
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
	<EditLinkCardForm
		{card}
		onSubmit={handleEditModalSubmit}
		onCancel={() => (editModalOpen = false)}
	/>
</Modal>
