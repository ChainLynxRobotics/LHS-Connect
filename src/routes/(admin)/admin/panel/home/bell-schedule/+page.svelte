<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { DefinedScheduleList } from '$lib/types/HomePageData';
	import EditableScheduleList from './EditableScheduleList.svelte';

	export let data: DefinedScheduleList;
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Defined Schedules" />
		<p class="mb-8"></p>
		<EditableScheduleList schedules={data.schedules} />
	</div>
</div>
