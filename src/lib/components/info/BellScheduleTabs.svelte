<script lang="ts">
	import BellScheduleTable from '$components/info/BellScheduleTable.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BellScheduleData, ScheduleId } from '$lib/types/HomePageData';
	import { Accordion, AccordionItem, TabItem, Tabs } from 'flowbite-svelte';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	// Import the data from the parent component
	interface Props {
		data: BellScheduleData;
	}

	let { data }: Props = $props();

	// Precalculate the shown tabs and the selected tab

	let tabs: ScheduleId[] = $state([]);
	let selectedTab = $state(0);

	let now = $state(DateTime.now().setZone('America/Los_Angeles'));
	let dayOfWeek = $derived(now.get('weekday'));
	let dateEpoch = $state(DateTime.now().setZone('America/Los_Angeles').startOf('day').toMillis());
	
	$effect.pre(() => {
		// Default day schedules
		let newTabs: ScheduleId[] = [];
		for (let i = 0; i < data.defaults.length; i++) {
			const scheduleId = data.defaults[i];
			if (!newTabs.includes(scheduleId)) {
				newTabs.push(scheduleId);
			}
			if (dayOfWeek === i) selectedTab = newTabs.indexOf(scheduleId);
		}

		// Get the special schedule for today
		const specials = data.specials.filter((item) => item.date === dateEpoch);
		for (let i = 0; i < specials.length; i++) {
			const scheduleId = specials[i].scheduleId;
			if (newTabs.includes(scheduleId)) continue;
			newTabs.unshift(scheduleId);
			selectedTab = 0;
		}

		tabs = newTabs;
	});

	// Add any future special schedules
	let upcomingSpecialSchedules: { date: number; scheduleId: ScheduleId; dateStr: string }[] = $derived(data.specials
		.filter((item) => item.date > dateEpoch)
		.map((item) => ({
			...item,
			dateStr: DateTime.fromMillis(item.date).toFormat('L/d/yy')
		}))
	);

	// setInterval to update reactive data
	onMount(() => {
		// Update the current time every 10 seconds
		let clear = setInterval(() => {
			now = DateTime.now().setZone('America/Los_Angeles');
			dateEpoch = DateTime.now().setZone('America/Los_Angeles').startOf('day').toMillis();
		}, 10000);
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
		<TabItem open={i === selectedTab} title={schedule?.name || 'Unknown'}>
			<BellScheduleTable {schedule} reactive={i === selectedTab} />
		</TabItem>
	{/each}

	{#if upcomingSpecialSchedules.length > 0}
		<TabItem title="Upcoming...">
			<Accordion multiple>
				{#each upcomingSpecialSchedules as special}
					{@const schedule = data.schedules.find((s) => s.id === special.scheduleId)}
					<AccordionItem>
						<span slot="header">{schedule?.name || 'Unknown'} - {special.dateStr}</span>
						<BellScheduleTable {schedule} />
					</AccordionItem>
				{/each}
			</Accordion>
		</TabItem>
	{/if}
</Tabs>
