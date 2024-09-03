<script lang="ts">
	import LinkCardContent from '$components/LinkCardContent.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';

	export let title: string;
	export let data: LinkCardListData;
</script>

<SectionHeader {title} />
<div class="flex flex-wrap items-start justify-center gap-4">
	{#each data.cards as card}
		<LinkCardContent {card} />
	{/each}
</div>
