<script lang="ts">
	import type { PageData } from './$types';
	import BellSchedule from './BellScheduleTabs.svelte';
	import BulletinBoard from './BulletinBoard.svelte';
	import LinkCardList from './LinkCardList.svelte';

	// Data from the server
	export let data: PageData;
</script>

<svelte:head>
	<title>LHS Connect | Home</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center gap-8 p-4 pb-16">
	<div class="flex flex-col gap-8 lg:flex-row lg:items-start">
		<div class="w-full max-w-xl">
			<BulletinBoard data={data.bulletinBoard} />
		</div>
		<div class="w-full max-w-xl">
			<BellSchedule data={data.bellSchedules} />
		</div>
	</div>

	<div class="w-full max-w-4xl">
		<LinkCardList title="Contact Information" data={data.contactInfo} />
	</div>
	<div class="w-full max-w-4xl">
		<LinkCardList title="Useful Links" data={data.usefulLinks} />
	</div>
</div>
