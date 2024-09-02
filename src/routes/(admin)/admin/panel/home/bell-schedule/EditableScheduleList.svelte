<script lang="ts">
	import { default as initialKnownSchedules } from '$lib/fake_data/knownSchedules';
	import type { BellSchedule } from '$lib/types/HomePageData';
	import { Button, Accordion, Modal } from 'flowbite-svelte';
	import EditableScheduleItem from './EditableScheduleItem.svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';
	import EditScheduleForm from './EditScheduleForm.svelte';

	export let knownSchedules: BellSchedule[] = initialKnownSchedules;

	//////////////// Editing //////////////////

	function handleNew() {
		knownSchedules = [
			...knownSchedules,
			{
				name: 'New Schedule',
				periods: [
					{
						name: 'Period 1',
						start: '8:00',
						end: '9:00'
					}
				]
			}
		];
	}

	function handleDuplicate(index: number) {
		const schedule = knownSchedules[index];
		if (!schedule) return;
		knownSchedules = [
			...knownSchedules,
			JSON.parse(JSON.stringify(schedule))
		];
	}

	function handleDelete(index: number) {
		knownSchedules.splice(index, 1);
		knownSchedules = knownSchedules; // Force update
	}


	//////////////// Editing Modal //////////////////

	let editModalOpen = false;
	let editModalIndex = 0;
	let editModalSchedule: BellSchedule | undefined = undefined;

	function openEditModal(index: number) {
		editModalOpen = true;
		editModalIndex = index;
		editModalSchedule = knownSchedules[index];
	}
</script>

<Button color="alternative" on:click={handleNew}>New Schedule</Button>

<Accordion flush defaultClass="w-full max-w-lg">
	<DraggableList
		items={knownSchedules}
		update={(schedules) => (knownSchedules = schedules)}
		sectionClass="py-4"
		dragWrapperClass="bg-white dark:bg-gray-900"
		let:item
		let:index
	>
		<EditableScheduleItem
			schedule={item}
			on:editButtonClick={() => openEditModal(index)}
			on:duplicateButtonClick={() => handleDuplicate(index)}
			on:deleteButtonClick={() => handleDelete(index)}
		/>
	</DraggableList>
</Accordion>

<Modal bind:open={editModalOpen} size="lg" autoclose={false}>
	<EditScheduleForm 
		schedule={editModalSchedule || {name: '', periods: []}} 
		onSave={(schedule) => {
			knownSchedules[editModalIndex] = schedule;
			knownSchedules = knownSchedules; // Force update
			editModalOpen = false;
		}}
		on:close={() => editModalOpen = false}
	/>
</Modal>