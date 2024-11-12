<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';
	import EditableLinkCardList from '../useful-links/EditableLinkCardList.svelte';

	interface Props {
		data: LinkCardListData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Contact Info" />
		<p class="mb-8"></p>
		<EditableLinkCardList cards={data.cards} />
	</div>
</div>
