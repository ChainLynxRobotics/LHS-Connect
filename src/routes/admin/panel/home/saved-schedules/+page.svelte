<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { SavedScheduleData } from '$lib/types/HomePageData';
	import SavedScheduleList from './SavedScheduleList.svelte';

	interface Props {
		data: SavedScheduleData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Saved Schedules" />
		<p class="mb-8">
			These are the saved schedules that can be then referenced on the Bell Schedule page.
		</p>
		<SavedScheduleList schedules={data.schedules} />
	</div>
</div>
