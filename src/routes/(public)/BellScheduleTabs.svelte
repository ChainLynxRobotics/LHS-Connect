<script lang="ts">
	import BellScheduleTable from '$components/BellScheduleTable.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BellSchedule, BellScheduleData } from '$lib/types/HomePageData';
	import { Accordion, AccordionItem, TabItem, Tabs } from 'flowbite-svelte';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	// Import the data from the parent component
	export let data: BellScheduleData;

	// Precalculate the shown tabs and the selected tab

	let tabs: BellSchedule[] = [];
	let selectedTab = 0;
	let upcomingSpecialSchedules: { date: number[]; schedule: BellSchedule, dateStr: string }[] = [];

	let now = DateTime.now().setZone("America/Los_Angeles");
	let dayOfWeek = now.get("weekday");
	let dateEpoch = DateTime.now().setZone("America/Los_Angeles").startOf("day").toMillis();
	$: {
		// Default day schedules
		tabs = [...data.defaults.map((item) => item.schedule)];
		selectedTab = 0;
		for (const item of data.defaults) {
			if (item.daysOfWeek.includes(dayOfWeek)) selectedTab = tabs.indexOf(item.schedule);
		}

		// Get the special schedule for today
		for (const item of data.special) {
			if (item.date.includes(dateEpoch)) {
				tabs.unshift(item.schedule);
				selectedTab = 0;
			}
		}

		// Add any future special schedules
		upcomingSpecialSchedules = data.special.filter((schedule) => {
			return schedule.date.some((date) => date > new Date().getTime());
		}).map((schedule) => {
			return {
				...schedule,
				dateStr: schedule.date
					.filter((date) => date > now.toMillis())
					.map((date) => DateTime.fromMillis(date).toFormat('L/d/yy'))
					.join(', ')
			};
		});
	}

	// setInterval to check if the minute has changed to update the reactive components
	onMount(() => {
		// Set the interval to check for the minute change
		let clear = setInterval(() => {
			let current = DateTime.now().setZone("America/Los_Angeles");
			if (current.get("minute") !== now.get("minute")) {
				now = current;
				dayOfWeek = now.get("weekday");
				dateEpoch = DateTime.now().setZone("America/Los_Angeles").startOf("day").toMillis();
			}
		}, 1000);
		return () => clearInterval(clear);
	});
</script>

<SectionHeader title="Bell Schedule" />
<Tabs
	tabStyle="none"
	contentClass="pt-4 bg-white dark:bg-gray-900"
	defaultClass="flex flex-wrap ltr:mr-2 rtl:ml-2"
>
	{#each tabs as tab, i}
		<TabItem open={i === selectedTab}>
			<span slot="title">{tab.name}</span>
			<BellScheduleTable schedule={tab} reactive={i === selectedTab} />
		</TabItem>
	{/each}

	{#if upcomingSpecialSchedules.length > 0}
		<TabItem>
			<div slot="title" class="flex items-center gap-2">Upcoming...</div>
			<Accordion multiple>
				{#each upcomingSpecialSchedules as special}
					<AccordionItem>
						<span slot="header"
							>{special.schedule.name} - {special.dateStr}</span
						>
						<BellScheduleTable schedule={special.schedule} />
					</AccordionItem>
				{/each}
			</Accordion>
		</TabItem>
	{/if}
</Tabs>