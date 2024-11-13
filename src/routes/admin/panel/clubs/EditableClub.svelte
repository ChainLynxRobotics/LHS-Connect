<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import ExternalLink from '$components/ExternalLink.svelte';
	import type { Club } from '$lib/types/ClubPageData';
	import { Modal, TableBodyCell, TableBodyRow, Tooltip, Popover } from 'flowbite-svelte';
	import {
		EditOutline,
		FileCopyOutline,
		TrashBinOutline,
		InfoCircleOutline
	} from 'flowbite-svelte-icons';
	import EditableClubForm from './EditableClubForm.svelte';

	interface Props {
		club: Club;
		onEdit: (club: Club) => void;
		onDuplicate: () => void;
		onDelete: () => void;
	}

	let { club, onEdit, onDuplicate, onDelete }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(_club: Club) {
		onEdit(_club);
		editModalOpen = false;
	}
</script>

<TableBodyRow>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{club.name}
		{#if club.desc}
			<InfoCircleOutline class="inline h-4 w-4 text-gray-500 dark:text-gray-400" />
			<Popover title={club.name} placement="top-start" class="max-w-lg">
				{club.desc}
			</Popover>
		{/if}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.day}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.time}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.location}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.advisor}</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{#if club.instagram}
			<ExternalLink href="https://instagram.com/{club.instagram}" text="@{club.instagram}" />
		{/if}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm align-top">
		<div class="flex">
			<button title="Edit" onclick={stopPropagation(() => (editModalOpen = true))} class="!p-2"
				><EditOutline class="h-6 w-6" /></button
			>
			<Tooltip>Edit</Tooltip>
			<button title="Duplicate" onclick={stopPropagation(() => onDuplicate())} class="!p-2"
				><FileCopyOutline class="h-6 w-6" /></button
			>
			<Tooltip>Duplicate</Tooltip>
			<button title="Delete" onclick={stopPropagation(() => onDelete)} class="!p-2"
				><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
			>
			<Tooltip>Delete</Tooltip>
		</div>
	</TableBodyCell>
</TableBodyRow>

<Modal bind:open={editModalOpen} size="sm" autoclose={false}>
	<EditableClubForm
		{club}
		onSubmit={handleEditModalSubmit}
		onCancel={() => (editModalOpen = false)}
	/>
</Modal>
