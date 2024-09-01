<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import EditableScheduleList from './EditableScheduleList.svelte';
</script>

<div class="flex flex-col items-center p-4">
	<div class="mb-8 w-full max-w-lg">
		<SectionHeader title="Defined Schedules" />
		<p></p>
	</div>
	<EditableScheduleList />
</div>
