<script lang="ts">
	import type { PageData } from './$types';
	import BellSchedule from './BellScheduleTabs.svelte';
	
	// Data from the server
	export let data: PageData;
</script>

<svelte:head>
	<title>LHS Connect | Home</title>
</svelte:head>

<div class="flex w-full flex-col flex-wrap items-center p-4">
	<div class="w-full max-w-xl">
		<BellSchedule data={data.bellSchedules} />
	</div>
</div>
