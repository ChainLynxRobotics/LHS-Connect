<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { AdminShortLinkData, ShortLinkData } from '$lib/types/LinkGeneratorData';
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import EditableLink from './EditableLink.svelte';

	interface Props {
		links: AdminShortLinkData[];
	}

	let { links }: Props = $props();
	$effect(() => {
		links = links.sort((a, b) => b.createdAt - a.createdAt);
	});

	// New link creation is handled by the public link generator page

	function handleEdit(index: number, link: ShortLinkData) {
		links[index] = {
			...links[index],
			...link
		};
	}

	function handleDelete(index: number) {
		links.splice(index, 1);
		links = links; // Force update
	}
</script>

<div class="w-full">
	<Table striped shadow class="w-full">
		<TableHead>
			<TableHeadCell padding="p-4">Suffix</TableHeadCell>
			<TableHeadCell padding="p-4">Link</TableHeadCell>
			<TableHeadCell padding="p-4">Password</TableHeadCell>
			<TableHeadCell padding="p-4">Created At</TableHeadCell>
			<TableHeadCell padding="p-4">Uses</TableHeadCell>
			<TableHeadCell padding="p-4">Actions</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each links as link, index}
				<EditableLink
					{link}
					onEdit={(e) => handleEdit(index, e)}
					onDelete={() => handleDelete(index)}
				/>
			{/each}
		</TableBody>
	</Table>
</div>
