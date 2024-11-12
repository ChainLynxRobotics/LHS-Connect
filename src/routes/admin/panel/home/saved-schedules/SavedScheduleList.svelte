<script lang="ts">
	import type { BellSchedule } from '$lib/types/HomePageData';
	import { Button, Accordion } from 'flowbite-svelte';
	import SavedScheduleItem from './SavedScheduleItem.svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';

	interface Props {
		schedules: BellSchedule[];
	}

	let { schedules = $bindable() }: Props = $props();

	//////////////// Editing //////////////////

	function handleNew() {
		schedules.push({
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
			name: 'New Schedule',
			periods: [
				{
					name: 'Period 1',
					start: '8:00',
					end: '9:00'
				}
			]
		});
		schedules = schedules; // Force update
	}

	function handleEdit(index: number, schedule: BellSchedule) {
		schedules[index] = schedule;
	}

	function handleDuplicate(index: number) {
		schedules.splice(index, 0, JSON.parse(JSON.stringify(schedules[index])));
		schedules = schedules; // Force update
	}

	function handleDelete(index: number) {
		schedules.splice(index, 1);
		schedules = schedules; // Force update
	}
</script>

<div class="w-full">
	<div class="mb-8 flex justify-center">
		<Button color="alternative" on:click={handleNew}>New Schedule</Button>
	</div>

	<Accordion flush defaultClass="w-full max-w-lg mx-auto">
		<DraggableList
			dragZoneType="schedules"
			items={schedules}
			update={(items) => (schedules = items)}
			sectionClass="py-4"
			dragWrapperClass="bg-white dark:bg-gray-900"
		>
			{#snippet children({ item, index })}
				<SavedScheduleItem
					schedule={item}
					onEdit={(e) => handleEdit(index, e)}
					onDuplicate={() => handleDuplicate(index)}
					onDelete={() => handleDelete(index)}
				/>
			{/snippet}
		</DraggableList>
	</Accordion>
</div>
