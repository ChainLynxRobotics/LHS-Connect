<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { A, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import CrudList from '$components/admin/CRUDList.svelte';
	import EditableLink from './EditableLink.svelte';
	import type { AdminShortLinkPageData } from '$lib/types/AdminShortLinkPageData';

	interface Props {
		data: AdminShortLinkPageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Links" />
		<p class="mb-8">
			User created shortened links. If you want to create your own, visit the <A
				href="/link-generator">Link Generator page</A
			>.
		</p>
		<CrudList
			items={data.links}
			canCreate={false}
			canDuplicate={false}
			sortFn={(a, b) => b.createdAt - a.createdAt}
		>
			{#snippet renderItems({ items })}
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
						{#each items as { item, update, remove } (item.id)}
							<EditableLink link={item} onUpdate={update} onRemove={remove} />
						{/each}
					</TableBody>
				</Table>
			{/snippet}
		</CrudList>
	</div>
</div>
