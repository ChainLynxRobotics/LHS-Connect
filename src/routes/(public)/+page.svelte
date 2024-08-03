<script lang="ts">
	import type { PageData } from './$types';
	import BellSchedule from './BellScheduleTabs.svelte';
	import BulletinBoard from './BulletinBoard.svelte';

	// Data from the server
	export let data: PageData;
</script>

<svelte:head>
	<title>LHS Connect | Home</title>
</svelte:head>

<div class="flex flex-col w-full justify-center md:flex-row p-4 gap-8">
	<div class="w-full max-w-xl">
		<BulletinBoard data={data.bulletinBoard} />
	</div>
	<div class="w-full max-w-xl">
		<BellSchedule data={data.bellSchedules} />
	</div>
</div>
