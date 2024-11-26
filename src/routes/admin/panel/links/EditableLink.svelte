<script lang="ts">
	import { Modal, TableBodyCell, TableBodyRow, Tooltip, A } from 'flowbite-svelte';
	import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { DateTime } from 'luxon';
	import EditableLinkForm from './EditableLinkForm.svelte';
	import type { IShortLink } from '$lib/types/crud/shortLink';
	import type { WithoutID } from '$lib/types/crud/globalCrud';

	interface Props {
		link: IShortLink;
		onUpdate: (e: WithoutID<IShortLink>) => void;
		onRemove: () => void;
	}

	let { link, onUpdate, onRemove }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(e: WithoutID<IShortLink>) {
		onUpdate({
			...link,
			...e
		});
		editModalOpen = false;
	}
</script>

<TableBodyRow>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm">{link.suffix}</TableBodyCell>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm"
		><A href={link.url} target="_blank" rel="noreferrer" class="line-clamp-6">{link.url}</A></TableBodyCell
	>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm">
		{#if link.password}
			<span>••••••••</span>
			<Tooltip>{link.password}</Tooltip>
		{/if}
	</TableBodyCell>
	<TableBodyCell tdClass="p-4 py-4 font-medium max-w-sm"
		>{DateTime.fromMillis(link.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</TableBodyCell
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
