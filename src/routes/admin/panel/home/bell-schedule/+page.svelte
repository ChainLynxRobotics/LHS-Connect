<script lang="ts">
	import CrudList from '$components/admin/CRUDList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, Table, TableHead, TableHeadCell, TableBody, Label } from 'flowbite-svelte';
	import { DateTime } from 'luxon';
	import DefaultSchedules from './DefaultSchedules.svelte';
	import SpecialScheduleRow from './SpecialScheduleRow.svelte';
	import BellScheduleTabs from '$components/info/BellScheduleTabs.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Select options for the schedule overrides
	let scheduleOptions = $derived(
		data.schedules.map((item) => ({ value: item.id, name: item?.name || 'Unknown' }))
	);

	let defaults = $state(data.defaults[0]?.bellScheduleIDs || []);
	let specials = $state(data.specials);

	let previewTime = $state(DateTime.now().toFormat(`yyyy-LL-dd'T'HH:mm`))!;
	$effect(() => console.log(previewTime));
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Days of the Week" />
		<p class="mb-8">The default bell schedules that always show up, one of each day of the week.</p>
		<DefaultSchedules defaults={defaults} {scheduleOptions} />

		<div class="h-24"></div>

		<SectionHeader title="Schedule Overrides" />
		<p class="mb-8">Special schedules that override the default schedules on specific dates.</p>
		<CrudList
			serviceId="bellScheduleOverrides"
			items={specials}
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

		<div class="h-24"></div>

		<SectionHeader title="Schedule Preview" />
		<div class="flex items-center mb-8">
			<Label for={`preview-time`} class="mr-4 text-xl">At Time:</Label>
			<input
				id={`preview-time`}
				name={`preview-time`}
				type="datetime-local"
				step="60"
				bind:value={previewTime}
				class="border-0 bg-white ring-primary-500 group-odd:bg-white group-even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
			/>
		</div>
		<div class="mx-auto max-w-2xl">
			<BellScheduleTabs data={{ ...data, defaults, specials}} customTime={DateTime.fromISO(previewTime).setZone('America/Los_Angeles')} />
		</div>
	</div>
</div>
