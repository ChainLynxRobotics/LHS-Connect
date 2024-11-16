<script lang="ts">
	import CrudList from '$components/admin/CRUDList.svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { SavedScheduleData } from '$lib/types/HomePageData';
	import { Button, Accordion } from 'flowbite-svelte';
	import SavedSchedule from './SavedSchedule.svelte';

	interface Props {
		data: SavedScheduleData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Saved Schedules" />
		<p class="mb-8">
			These are the saved schedules that can be then referenced on the Bell Schedule page.
		</p>
		<CrudList
			items={data.schedules}
			generateNewItem={() => ({
				name: 'New Schedule',
				periods: [
					{
						name: 'Period 1',
						start: '8:00',
						end: '9:00'
					}
				]
			})}
			canReorder={true}
			initialOrder={data.schedules.map((item) => item.id)}
		>
			{#snippet renderItems({ items, create, reorder })}
				<div class="mb-8 flex justify-center">
					<Button color="alternative" on:click={create}>New Schedule</Button>
				</div>

				<Accordion flush defaultClass="w-full max-w-lg mx-auto">
					<DraggableList
						dragZoneType="schedules"
						{items}
						updateOrder={reorder}
						sectionClass="py-4"
						dragWrapperClass="bg-white dark:bg-gray-900"
					>
						{#snippet item({ item, update, duplicate, remove })}
							<SavedSchedule
								schedule={item}
								onUpdate={update}
								onDuplicate={duplicate}
								onRemove={remove}
							/>
						{/snippet}
					</DraggableList>
				</Accordion>
			{/snippet}
		</CrudList>
	</div>
</div>
