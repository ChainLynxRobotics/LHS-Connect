<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import Edit from './Edit.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#snippet before()}
	<a href="example.com">before</a>
{/snippet}
{#snippet after()}
	<a href="google.com">after</a>
{/snippet}
<Table striped shadow>
	<TableHead>
		<TableHeadCell>Operation</TableHeadCell>
		<TableHeadCell>Edited By</TableHeadCell>
		<TableHeadCell>Edited On</TableHeadCell>
		<TableHeadCell>Operation</TableHeadCell>
	</TableHead>
	<TableBody>
		<Edit operation="create" editedBy="me" editedOn={new Date()} {before} {after} />
	</TableBody>
</Table>
