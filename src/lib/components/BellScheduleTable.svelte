<script lang="ts">
	import type { BellSchedule, TimeString } from '$lib/types/HomePageData';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let schedule: BellSchedule;
	export let reactive: boolean = false;

	function formatTime(time: TimeString): string {
		const [hours, minutes] = time.split(':');
		const hour = parseInt(hours);
		const minute = parseInt(minutes);
		const formattedHour = hour % 12 === 0 ? '12' : (hour % 12).toString();
		const formattedMinute = minute.toString().padStart(2, '0');
		return `${formattedHour}:${formattedMinute}`;
	}

	function currentlyWithinTime(start: TimeString, end: TimeString): boolean {
		const now = new Date();
		const [startHour, startMinute] = start.split(':').map(Number);
		const [endHour, endMinute] = end.split(':').map(Number);
		const startDateTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			startHour,
			startMinute
		);
		const endDateTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			endHour,
			endMinute
		);
		return now.getTime() >= startDateTime.getTime() && now.getTime() <= endDateTime.getTime();
	}
</script>

<Table divClass="relative mx-auto" striped>
	<!-- <TableHead theadClass="text-xs uppercase text-center">
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Time</TableHeadCell>
    </TableHead> -->
	<TableBody tableBodyClass="divide-y text-center">
		{#each schedule.periods as period}
			<TableBodyRow
				class={`${period.emphasis ? '!bg-gray-100 dark:!bg-gray-600' : ''} ${reactive && currentlyWithinTime(period.start, period.end) ? '!border-2 !border-yellow-200 dark:!border' : 'border-b last:border-b-0 dark:border-gray-700'}`}
			>
				<TableBodyCell tdClass={`px-6 py-4 whitespace-nowrap`}>
					{period.name}
				</TableBodyCell>
				<TableBodyCell tdClass={`px-6 py-4 whitespace-nowrap`}>
					{formatTime(period.start)} - {formatTime(period.end)}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{#if schedule.desc}
	<p class="mt-4 text-center text-sm opacity-75">{schedule.desc}</p>
{/if}
