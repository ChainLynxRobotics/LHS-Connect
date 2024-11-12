<script lang="ts">
	import type { PageData } from './$types';
	import ClubList from './ClubList.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>LHS Connect | Club List</title>
</svelte:head>

<div class="flex w-full flex-col flex-wrap items-center py-4 pb-16">
	<div class="w-full max-w-7xl">
		<ClubList clubs={data.clubs} />
	</div>
</div>
