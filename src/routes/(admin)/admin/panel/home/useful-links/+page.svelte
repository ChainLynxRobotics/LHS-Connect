<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';
	import EditableLinkCardList from './EditableLinkCardList.svelte';

	export let data: LinkCardListData;
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Useful Links" />
		<p class="mb-8"></p>
		<EditableLinkCardList cards={data.cards} />
	</div>
</div>
