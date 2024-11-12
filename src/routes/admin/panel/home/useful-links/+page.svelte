<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';
	import EditableLinkCardList from './EditableLinkCardList.svelte';

	interface Props {
		data: LinkCardListData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Useful Links" />
		<p class="mb-8">
			These links are rendered at the bottom of the page in a footer on all public pages
		</p>
		<EditableLinkCardList cards={data.cards} />
	</div>
</div>
