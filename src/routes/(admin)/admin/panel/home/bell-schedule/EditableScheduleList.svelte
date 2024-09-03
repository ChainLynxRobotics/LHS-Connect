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
		knownSchedules.push({
			name: 'New Schedule',
			periods: [
				{
					name: 'Period 1',
					start: '8:00',
					end: '9:00'
				}
			]
		});
		knownSchedules = knownSchedules; // Force update
	}

	function handleEdit(index: number, schedule: BellSchedule) {
		knownSchedules[index] = schedule;
	}

	function handleDuplicate(index: number) {
		knownSchedules.splice(index, 0, JSON.parse(JSON.stringify(knownSchedules[index])));
		knownSchedules = knownSchedules; // Force update
	}

	function handleDelete(index: number) {
		knownSchedules.splice(index, 1);
		knownSchedules = knownSchedules; // Force update
	}
</script>

<Button color="alternative" on:click={handleNew}>New Schedule</Button>

<Accordion flush defaultClass="w-full max-w-lg">
	<DraggableList
		dragZoneType="schedules"
		items={knownSchedules}
		update={(schedules) => (knownSchedules = schedules)}
		sectionClass="py-4"
		dragWrapperClass="bg-white dark:bg-gray-900"
		let:item
		let:index
	>
		<EditableScheduleItem
			schedule={item}
			on:edit={(e) => handleEdit(index, e.detail)}
			on:duplicate={() => handleDuplicate(index)}
			on:delete={() => handleDelete(index)}
		/>
	</DraggableList>
</Accordion>
