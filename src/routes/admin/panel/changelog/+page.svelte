<script lang="ts">
	import type { PageData } from './$types';
	import EditTable from './EditTable.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<EditTable {data} />
