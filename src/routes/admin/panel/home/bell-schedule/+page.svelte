<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BellScheduleData } from '$lib/types/HomePageData';
	import DefaultSchedules from './DefaultSchedules.svelte';
	import SpecialScheduleList from './SpecialScheduleList.svelte';

	interface Props {
		data: BellScheduleData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Days of the Week" />
		<p class="mb-8">The default bell schedules that always show up, one of each day of the week.</p>
		<DefaultSchedules schedules={data.schedules} defaults={data.defaults} />
		<div class="h-24"></div>
		<SectionHeader title="Schedule Overrides" />
		<p class="mb-8">Special schedules that override the default schedules on specific dates.</p>
		<SpecialScheduleList schedules={data.schedules} specials={data.specials} />
	</div>
</div>
