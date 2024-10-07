<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BellScheduleData } from '$lib/types/HomePageData';
	import DefaultSchedules from './DefaultSchedules.svelte';
    
    export let data: BellScheduleData;
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Days of the Week" />
		<p class="mb-8">The default bell schedules that always show up, one of each day of the week.</p>
		<DefaultSchedules schedules={data.schedules} defaults={data.defaults} />
	</div>
</div>