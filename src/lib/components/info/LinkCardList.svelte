<script lang="ts">
	import LinkCardContent from '$components/info/LinkCardContent.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';

	interface Props {
		title: string;
		data: LinkCardListData;
	}

	let { title, data }: Props = $props();
</script>

<SectionHeader {title} updatedAt={data.cards} />
<div class="flex flex-wrap items-start justify-center gap-4">
	{#each data.cards as card}
		<LinkCardContent {card} />
	{/each}
</div>
