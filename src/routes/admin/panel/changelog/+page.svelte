<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { PageData } from './$types';
	import EditTable from './EditTable.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-6xl">
		<SectionHeader title="Admin Edits to LHS Connect" />
	</div>

	<EditTable {data} />
</div>
