<script lang="ts">
	import type { BellSchedule, ScheduleOverride } from '$lib/types/HomePageData';
	import { Button, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import SpecialScheduleRow from './SpecialScheduleRow.svelte';
	import { DateTime } from 'luxon';

	interface Props {
		schedules?: readonly BellSchedule[];
		specials?: ScheduleOverride[];
	}

	let { schedules = [], specials = $bindable([]) }: Props = $props();

	function handleNew() {
		specials.push({
			date: DateTime.now().setZone('America/Los_Angeles').startOf('day').toMillis(),
			scheduleId: schedules[0]?.id
		});
		specials.sort((a, b) => a.date - b.date);
		specials = specials; // Force update
	}

	function handleEdit(index: number, special: ScheduleOverride) {
		console.log('edit', index, special);
		specials[index] = special;
		specials.sort((a, b) => a.date - b.date);
		specials = specials; // Force update
	}

	function handleDuplicate(index: number) {
		specials.splice(index, 0, JSON.parse(JSON.stringify(specials[index])));
		specials.sort((a, b) => a.date - b.date);
		specials = specials; // Force update
	}

	function handleDelete(index: number) {
		specials.splice(index, 1);
		specials = specials; // Force update
	}

	let scheduleOptions = $derived(
		schedules.map((item) => ({ value: item.id, name: item?.name || 'Unknown' }))
	);
</script>

<div class="w-full">
	<div class="mb-8 flex justify-center gap-8">
		<Button color="alternative" on:click={handleNew}>Add Schedule Override</Button>
	</div>
	<Table>
		<TableHead>
			<TableHeadCell>Date</TableHeadCell>
			<TableHeadCell>Schedule</TableHeadCell>
			<TableHeadCell class="text-right">Actions</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each specials as special, i}
				<SpecialScheduleRow
					{i}
					{special}
					{scheduleOptions}
					onEdit={(e) => handleEdit(i, e)}
					onDuplicate={() => handleDuplicate(i)}
					onDelete={() => handleDelete(i)}
				/>
			{/each}
		</TableBody>
	</Table>
</div>
