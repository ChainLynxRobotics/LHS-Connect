<script lang="ts">
	import BoardNoteContent from '$components/info/BoardNoteContent.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BulletinBoardData } from '$lib/types/HomePageData';

	interface Props {
		data: BulletinBoardData;
	}

	let { data }: Props = $props();
</script>

<SectionHeader title="Bulletin Board" updatedAt={data.notes} />
<div class="my-4 flex flex-col gap-4">
	{#each data.notes as note}
		<BoardNoteContent note={note} />
	{/each}
</div>
