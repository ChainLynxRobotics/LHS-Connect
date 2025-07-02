<script lang="ts">
	import type { PageData } from './$types';
	import BellSchedule from '$components/info/BellScheduleTabs.svelte';
	import BulletinBoard from '$components/info/BulletinBoard.svelte';
	import LinkCardList from '$components/info/LinkCardList.svelte';

	// Data from the server
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>LHS Connect | Home</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center gap-8 p-4 pb-16">
	<div class="grid-home-page grid gap-x-8 gap-y-16">
		<div>
			<BulletinBoard data={data.bulletinBoard} />
		</div>
		<div>
			<BellSchedule data={data.bellSchedule} />
		</div>
		<div class="lg:col-span-2">
			<LinkCardList title="Contact Information" data={data.contactInfo} />
		</div>
	</div>
</div>

<style>
	.grid-home-page {
		grid-template-columns: repeat(1, minmax(0, 42rem));
	}
	@media (min-width: 1024px) {
		.grid-home-page {
			grid-template-columns: repeat(2, minmax(0, 42rem));
		}
	}
</style>
