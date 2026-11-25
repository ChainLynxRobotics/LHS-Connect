<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { EditLogProps } from './types';

	let { operation, editedBy, editedOn, children }: EditLogProps = $props();
	let open: boolean = $state(false);
</script>

<TableBodyRow
	onclick={() => {
		open = !open;
	}}
>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{((str) => str.charAt(0).toUpperCase() + str.slice(1))(operation)}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{editedBy}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{editedOn}
	</TableBodyCell>
</TableBodyRow>
{#if open}
	<TableBodyRow>
		<TableBodyCell colspan={3}>
			{@render children()}
		</TableBodyCell>
	</TableBodyRow>
{/if}
