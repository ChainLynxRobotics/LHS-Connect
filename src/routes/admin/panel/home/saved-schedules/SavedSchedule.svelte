<script lang="ts">
	import DragHandleOutline from '$components/admin/DragHandleOutline.svelte';
	import BellScheduleTable from '$components/info/BellScheduleTable.svelte';
	import { AccordionItem, Modal, Tooltip } from 'flowbite-svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { dragHandle } from 'svelte-dnd-action';
	import SavedScheduleForm from './SavedScheduleForm.svelte';
	import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
	import type { WithoutID } from '$lib/types/crud/globalCrud';

	interface Props {
		schedule: IBellSchedule;
		onUpdate: (e: WithoutID<IBellSchedule>) => void;
		onDuplicate: () => void;
		onRemove: () => void;
	}

	let { schedule, onUpdate, onDuplicate, onRemove }: Props = $props();

	let editModalOpen = $state(false);

	function handleEditModalSubmit(e: WithoutID<IBellSchedule>) {
		onUpdate(e);
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
			<button type="button" title="Edit" onclick={() => (editModalOpen = true)} class="!p-2"
				><EditOutline class="h-6 w-6" /></button
			>
			<Tooltip>Edit</Tooltip>
			<button type="button" title="Duplicate" onclick={onDuplicate} tabindex="0" class="!p-2"
				><FileCopyOutline class="h-6 w-6" /></button
			>
			<Tooltip>Duplicate</Tooltip>
			<button type="button" title="Delete" onclick={onRemove} class="!p-2"
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
		onSubmit={handleEditModalSubmit}
		onCancel={() => (editModalOpen = false)}
	/>
</Modal>
