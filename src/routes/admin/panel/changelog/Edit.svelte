<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		operation: 'create' | 'update' | 'delete';
		editedBy: string;
		editedOn: Date;
		before: Snippet;
		after: Snippet;
	}

	let { operation, editedBy, editedOn, before, after }: Props = $props();
	let open_state: 'none' | 'before' | 'after' = $state('none');
	function handleBefore() {
		if (open_state === 'before') {
			open_state = 'none';
		} else {
			open_state = 'before';
		}
	}
	function handleAfter() {
		if (open_state === 'after') {
			open_state = 'none';
		} else {
			open_state = 'after';
		}
	}
</script>

<TableBodyRow>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{operation}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{editedBy}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{editedOn}
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
		{operation}
	</TableBodyCell>
	<TableBodyCell>
		<button onclick={handleBefore}> Before </button>
	</TableBodyCell>
	<TableBodyCell>
		<button onclick={handleAfter}> After </button>
	</TableBodyCell>
</TableBodyRow>
{#if open_state === 'before'}
	<TableBodyRow>
		<TableBodyCell colspan={6}>
			{@render before()}
		</TableBodyCell>
	</TableBodyRow>
{/if}
{#if open_state === 'after'}
	<TableBodyRow>
		<TableBodyCell colspan={6}>
			{@render after()}
		</TableBodyCell>
	</TableBodyRow>
{/if}
