<script lang="ts">
	import BellScheduleTable from '$components/BellScheduleTable.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BellScheduleData, ScheduleId } from '$lib/types/HomePageData';
	import { Accordion, AccordionItem, TabItem, Tabs } from 'flowbite-svelte';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	// Import the data from the parent component
	export let data: BellScheduleData;

	// Precalculate the shown tabs and the selected tab

	let tabs: ScheduleId[] = [];
	let selectedTab = 0;
	let upcomingSpecialSchedules: { date: number; scheduleId: ScheduleId, dateStr: string }[] = [];

	let now = DateTime.now().setZone("America/Los_Angeles");
	let dayOfWeek = now.get("weekday");
	let dateEpoch = DateTime.now().setZone("America/Los_Angeles").startOf("day").toMillis();
	$: {
		// Default day schedules
		const addedSchedules = new Set();
		tabs = [];
		for (let i = 0; i < data.defaults.length; i++) {
        const scheduleId = data.defaults[i];
			if (!addedSchedules.has(scheduleId)) {
				tabs.push(scheduleId);
				addedSchedules.add(scheduleId);
			}
			if (dayOfWeek === i) selectedTab = tabs.indexOf(scheduleId);
		}

		// Get the special schedule for today
		const specials = data.specials.filter((item) => item.date === dateEpoch);
		for (let i = 0; i < specials.length; i++) {
			const scheduleId = specials[i].scheduleId;
			if (tabs.includes(scheduleId)) continue;
			tabs.unshift(scheduleId);
			selectedTab = 0;
		}

		// Add any future special schedules
		upcomingSpecialSchedules = data.specials
			.filter((item) => item.date > dateEpoch)
			.map((item) => ({
				...item,
				dateStr: DateTime.fromMillis(item.date).toFormat('L/d/yy')
			}));
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
	{#each tabs as scheduleId, i}
		{@const schedule = data.schedules.find((s) => s.id === scheduleId)}
		<TabItem open={i === selectedTab}>
			<span slot="title">{schedule?.name || "Unknown"}</span>
			<BellScheduleTable schedule={schedule} reactive={i === selectedTab} />
		</TabItem>
	{/each}

	{#if upcomingSpecialSchedules.length > 0}
		<TabItem>
			<div slot="title" class="flex items-center gap-2">Upcoming...</div>
			<Accordion multiple>
				{#each upcomingSpecialSchedules as special}
					{@const schedule = data.schedules.find((s) => s.id === special.scheduleId)}
					<AccordionItem>
						<span slot="header"
							>{schedule?.name || "Unknown"} - {special.dateStr}</span
						>
						<BellScheduleTable schedule={schedule} />
					</AccordionItem>
				{/each}
			</Accordion>
		</TabItem>
	{/if}
</Tabs>