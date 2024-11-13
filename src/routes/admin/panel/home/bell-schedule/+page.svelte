<script lang="ts">
	import CrudList from '$components/admin/CRUDList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BellScheduleData } from '$lib/types/HomePageData';
	import { Button, Table, TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';
	import { DateTime } from 'luxon';
	import DefaultSchedules from './DefaultSchedules.svelte';
	import SpecialScheduleRow from './SpecialScheduleRow.svelte';

	interface Props {
		data: BellScheduleData;
	}

	let { data }: Props = $props();

	// Select options for the schedule overrides
	let scheduleOptions = $derived(
		data.schedules.map((item) => ({ value: item.id, name: item?.name || 'Unknown' }))
	);
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Days of the Week" />
		<p class="mb-8">The default bell schedules that always show up, one of each day of the week.</p>
		<DefaultSchedules defaults={data.defaults} {scheduleOptions} />

		<div class="h-24"></div>

		<SectionHeader title="Schedule Overrides" />
		<p class="mb-8">Special schedules that override the default schedules on specific dates.</p>
		<CrudList
			initialItems={data.specials}
			generateNewItem={() => ({
				date: DateTime.now().setZone('America/Los_Angeles').startOf('day').toMillis(),
				scheduleId: data.schedules[0]?.id
			})}
			canReorder={false}
			sortFn={(a, b) => a.date - b.date}
		>
			{#snippet renderItems({ items, create })}
				<div class="mb-8 flex justify-center gap-8">
					<Button color="alternative" on:click={create}>Add Schedule Override</Button>
				</div>
				<Table>
					<TableHead>
						<TableHeadCell>Date</TableHeadCell>
						<TableHeadCell>Schedule</TableHeadCell>
						<TableHeadCell class="text-right">Actions</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each items as item (item.id)}
							<SpecialScheduleRow
								special={item.item}
								{scheduleOptions}
								onUpdate={item.update}
								onDuplicate={item.duplicate}
								onRemove={item.remove}
							/>
						{/each}
					</TableBody>
				</Table>
			{/snippet}
		</CrudList>
	</div>
</div>
