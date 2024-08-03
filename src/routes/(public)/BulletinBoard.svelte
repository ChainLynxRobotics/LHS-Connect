<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import type { BulletinBoardData } from "$lib/types/HomePageData";
	import SvelteMarkdown from "svelte-markdown";

	export let data: BulletinBoardData;
</script>

<SectionHeader title="Bulletin Board" />
<div class="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-4">
	<div class="prose">
		<SvelteMarkdown source={data.content} />
	</div>
	<div class="flex flex-wrap justify-center gap-4 m-4">
		{#each data.notes as note}
			<div class="relative w-40 min-h-40 origin-top shadow-xl p-2 text-black dark:opacity-75" style='background-color: {note.color}; rotate: {note.rotation}deg;'>
				<div class="prose">
					<SvelteMarkdown source={note.content} />
				</div>
				<div class="pin"></div>
			</div>
		{/each}
	</div>
</div>

<style>
	.pin {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -25%);
		background-color: #dd4e4e;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}
</style>