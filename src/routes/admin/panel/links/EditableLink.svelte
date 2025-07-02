<script lang="ts">
	import { Modal, TableBodyCell, TableBodyRow, Tooltip, A } from 'flowbite-svelte';
	import { CheckOutline, EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import EditableLinkForm from './EditableLinkForm.svelte';
	import dayjs from '$lib/util/dayjs';
	import type { IPublicShortLink, IShortLinkAdminUpdate } from '$api/short_link/types';

	interface Props {
		link: IPublicShortLink;
		onUpdate: (e: IShortLinkAdminUpdate) => void;
		onRemove: () => void;
	}

	let { link, onUpdate, onRemove }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(e: IShortLinkAdminUpdate) {
		onUpdate({
			...link,
			...e,
		});
		editModalOpen = false;
	}
</script>

<TableBodyRow>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm">{link.suffix}</TableBodyCell>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm"
		><A href={link.url} target="_blank" rel="noreferrer" class="line-clamp-6">{link.url}</A
		></TableBodyCell
	>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm">
		{#if link.hasPassword}
			<CheckOutline class="h-6 w-6" />
		{/if}
	</TableBodyCell>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm"
		>{dayjs(link.createdAt).format('L LT')}</TableBodyCell
	>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm">{link.uses}</TableBodyCell>
	<TableBodyCell tdClass="p-2 py-4 font-medium max-w-sm align-top">
		<div class="flex justify-center">
			<button title="Edit" onclick={() => (editModalOpen = true)} class="!p-2"
				><EditOutline class="h-6 w-6" /></button
			>
			<Tooltip>Edit</Tooltip>

			<button title="Delete" onclick={onRemove} class="!p-2"
				><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
			>
			<Tooltip>Delete</Tooltip>
		</div>
	</TableBodyCell>
</TableBodyRow>

<Modal bind:open={editModalOpen} size="sm" autoclose={false}>
	<EditableLinkForm
		{link}
		onSubmit={handleEditModalSubmit}
		onCancel={() => (editModalOpen = false)}
	/>
</Modal>
