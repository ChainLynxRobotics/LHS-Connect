<script lang="ts">
	import EditableBoard from './EditableBoard.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
</script>

<div class="flex flex-col items-center p-4">
	<div class="mb-8 w-full max-w-lg">
		<SectionHeader title="Bulletin Board" />
		<p>The title and content support markdown, and you can drag the notes around.</p>
	</div>
	<EditableBoard />
</div>
