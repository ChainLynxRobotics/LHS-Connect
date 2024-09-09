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

	function getRowClass(periodIndex: number): string {
		const period = schedule.periods[periodIndex];
		let c = 'text-base';
		if (period.emphasis) {
			c += ' !bg-gray-100 dark:!bg-gray-600';
		}
		if (reactive && currentlyWithinTime(period.start, period.end)) {
			c += ' !border-2 !border-primary-500';
		} else {
			c += ' border-b last:border-b-0 dark:border-gray-700';
			// Check for passing period
			if (reactive && schedule.periods[periodIndex - 1] && currentlyWithinTime(schedule.periods[periodIndex - 1].end, period.start)) {
				c += ' !border-t-2 !border-t-primary-500';
			}
		}
		return c;
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

<Table divClass="relative mx-auto border dark:border-gray-700" striped>
	<!-- <TableHead theadClass="text-xs uppercase text-center">
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Time</TableHeadCell>
    </TableHead> -->
	<TableBody tableBodyClass="divide-y text-center">
		{#each schedule.periods as period, i}
			<TableBodyRow
				class={getRowClass(i)}
			>
				<TableBodyCell>
					{period.name}
				</TableBodyCell>
				<TableBodyCell>
					{formatTime(period.start)} - {formatTime(period.end)}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{#if schedule.desc}
	<p class="mt-4 text-center text-sm opacity-75">{schedule.desc}</p>
{/if}
