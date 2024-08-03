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


<div class="w-full flex flex-col justify-center items-center p-4 gap-8">
	<div class="flex flex-col lg:flex-row lg:items-start gap-8">
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
		<LinkCardList title="Useful Links" data={data.contactInfo} />
	</div>
</div>
