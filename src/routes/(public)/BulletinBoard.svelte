<script lang="ts">
	import BoardNoteContent from "$components/BoardNoteContent.svelte";
	import SectionHeader from "$components/SectionHeader.svelte";
	import type { BulletinBoardData } from "$lib/types/HomePageData";

	export let data: BulletinBoardData;
</script>

<SectionHeader title="Bulletin Board" />
<div class="flex flex-col gap-4 my-4">
	{#each data.notes as note}
		{#if note.link}
			<a href={note.link} target="_blank" rel="noopener noreferrer">
				<BoardNoteContent note={note} />
			</a>
		{:else}
			<BoardNoteContent note={note} />
		{/if}
	{/each}
</div>