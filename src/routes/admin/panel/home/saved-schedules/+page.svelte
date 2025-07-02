<script lang="ts">
	import DraggableList from '$components/admin/DraggableList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, Accordion, AccordionItem, Modal } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import EditableItemList from '$components/admin/EditableItemList.svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import DragHandleOutline from '$components/admin/DragHandleOutline.svelte';
	import BellScheduleTable from '$components/info/BellScheduleTable.svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import SavedScheduleForm from './SavedScheduleForm.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Saved Schedules" updatedAt={data.bellSchedules} />
		<p class="mb-8">
			These are the saved schedules that can be then referenced on the Bell Schedule page.
		</p>
		<EditableItemList
			serviceId="bellSchedule/bellSchedules"
			items={data.bellSchedules}
			generateNewItem={() => ({
				name: 'New Schedule',
				periods: [
					{
						name: 'Period 1',
						start: '8:00',
						end: '9:00',
					},
				],
			})}
			order={{
				canReorder: true,
			}}
		>
			{#snippet renderItems({ items, openCreateForm, reorder })}
				<div class="mb-8 flex justify-center">
					<Button color="alternative" on:click={openCreateForm}>New Schedule</Button>
				</div>

				<Accordion flush defaultClass="w-full max-w-lg mx-auto">
					<DraggableList
						dragZoneType="schedules"
						{items}
						{reorder}
						class="py-4"
						wrapperProps={{ class: 'bg-white dark:bg-gray-900' }}
					>
						{#snippet renderItem({ item, openEditFrom, duplicate, remove })}
							<AccordionItem
								defaultClass="flex items-center gap-8 w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-70"
							>
								<div slot="header" class="flex w-full justify-between gap-4">
									<div class="flex items-center gap-2">
										<span use:dragHandle class="flex items-center">
											<DragHandleOutline />
										</span>
										<span>{item.name}</span>
									</div>
									<div class="flex">
										<button title="Edit" onclick={openEditFrom} class="!p-2">
											<EditOutline class="h-6 w-6" />
										</button>
										<button title="Duplicate" onclick={duplicate} class="!p-2">
											<FileCopyOutline class="h-6 w-6" />
										</button>
										<button title="Delete" onclick={remove} class="!p-2">
											<TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" />
										</button>
									</div>
								</div>
								<BellScheduleTable schedule={item} />
							</AccordionItem>
						{/snippet}
					</DraggableList>
				</Accordion>
			{/snippet}

			{#snippet editForm({ item, onSubmit, onCancel })}
				<Modal open size="lg" autoclose={false} on:close={onCancel}>
					<SavedScheduleForm schedule={item} {onSubmit} {onCancel} />
				</Modal>
			{/snippet}
		</EditableItemList>
	</div>
</div>
