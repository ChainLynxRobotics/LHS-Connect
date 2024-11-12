<script lang="ts">
	import type { BellSchedule, TimeString } from '$lib/types/HomePageData';
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { DateTime } from 'luxon';

	interface Props {
		schedule?: BellSchedule;
		reactive?: boolean;
	}

	let { schedule, reactive = false }: Props = $props();

	function formatTime(time: TimeString): string {
		const [hours, minutes] = time.split(':');
		const hour = parseInt(hours);
		const minute = parseInt(minutes);
		const formattedHour = hour % 12 === 0 ? '12' : (hour % 12).toString();
		const formattedMinute = minute.toString().padStart(2, '0');
		return `${formattedHour}:${formattedMinute}`;
	}

	function getRowClass(periodIndex: number): string {
		let c = 'text-base';
		if (!schedule) return c;

		const period = schedule.periods[periodIndex];
		if (period.emphasis) {
			c += ' !bg-gray-100 dark:!bg-gray-600';
		}
		if (reactive && currentlyWithinTime(period.start, period.end)) {
			c += ' !border-2 !border-primary-500';
		} else {
			c += ' border-b last:border-b-0 dark:border-gray-700';
			// Check for passing period
			if (
				reactive &&
				schedule.periods[periodIndex - 1] &&
				currentlyWithinTime(schedule.periods[periodIndex - 1].end, period.start)
			) {
				c += ' !border-t-2 !border-t-primary-500';
			}
		}
		return c;
	}

	function currentlyWithinTime(startStr: TimeString, endStr: TimeString): boolean {
		const now = DateTime.now().setZone('America/Los_Angeles').toMillis();
		const start = DateTime.fromFormat(startStr, 'HH:mm').setZone('America/Los_Angeles').toMillis();
		const end = DateTime.fromFormat(endStr, 'HH:mm').setZone('America/Los_Angeles').toMillis();
		return now >= start && now <= end;
	}
</script>

<Table class="table-fixed" divClass="relative mx-auto border dark:border-gray-700" striped>
	<TableBody tableBodyClass="divide-y text-center">
		{#each schedule?.periods || [] as period, i}
			<TableBodyRow class={getRowClass(i)}>
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
{#if schedule?.desc}
	<p class="mt-4 text-center text-sm opacity-75">{schedule.desc}</p>
{/if}
