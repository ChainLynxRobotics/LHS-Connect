<script lang="ts">
	import EditableBoard from './EditableBoard.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { BulletinBoardData } from '$lib/types/HomePageData';

	export let data: BulletinBoardData;
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Bulletin Board" />
		<p class="mb-8">The title and content support markdown, and you can drag the notes around.</p>
		<EditableBoard notes={data.notes} />
	</div>
</div>
