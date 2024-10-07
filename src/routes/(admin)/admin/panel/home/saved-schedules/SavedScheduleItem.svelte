<script lang="ts">
	import DragHandleOutline from '$components/admin/DragHandleOutline.svelte';
	import BellScheduleTable from '$components/BellScheduleTable.svelte';
	import type { BellSchedule } from '$lib/types/HomePageData';
	import { AccordionItem, Modal, Tooltip } from 'flowbite-svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import SavedScheduleForm from './SavedScheduleForm.svelte';

	export let schedule: BellSchedule;

	const dispatch = createEventDispatcher<{
		edit: BellSchedule;
		duplicate: null;
		delete: null;
	}>();

	let editModalOpen = false;

	function handleEditModalSubmit(e: CustomEvent<BellSchedule>) {
		dispatch('edit', e.detail);
		editModalOpen = false;
	}
</script>

<AccordionItem
	defaultClass="flex items-center gap-8 w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-70"
>
	<div slot="header" class="flex w-full justify-between gap-4">
		<div class="flex items-center gap-2">
			<span use:dragHandle class="flex items-center">
				<DragHandleOutline />
			</span>
			<span>{schedule.name}</span>
		</div>
		<div class="flex">
			<button title="Edit" on:click|stopPropagation={() => (editModalOpen = true)} class="!p-2"
				><EditOutline class="h-6 w-6" /></button
			>
			<Tooltip>Edit</Tooltip>
			<button title="Duplicate" on:click|stopPropagation={() => dispatch('duplicate')} class="!p-2"
				><FileCopyOutline class="h-6 w-6" /></button
			>
			<Tooltip>Duplicate</Tooltip>
			<button title="Delete" on:click|stopPropagation={() => dispatch('delete')} class="!p-2"
				><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
			>
			<Tooltip>Delete</Tooltip>
		</div>
	</div>
	<BellScheduleTable {schedule} />
</AccordionItem>

<Modal bind:open={editModalOpen} size="lg" autoclose={false}>
	<SavedScheduleForm
		{schedule}
		on:submit={handleEditModalSubmit}
		on:cancel={() => (editModalOpen = false)}
	/>
</Modal>
