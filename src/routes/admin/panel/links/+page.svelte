<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { A, Table, TableBody, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import CrudList from '$components/admin/CRUDList.svelte';
	import EditableLink from './EditableLink.svelte';
	import type { AdminShortLinkPageData } from '$lib/types/AdminShortLinkPageData';
	import type { InfiniteEvent } from 'svelte-infinite-loading';
	import adminApiClient from '$lib/util/adminApiClient';
	import type { IShortLink } from '$lib/types/crud/shortLink';
	import VirtualList from 'svelte-tiny-virtual-list';
	import InfiniteLoading from 'svelte-infinite-loading';

	interface Props {
		data: AdminShortLinkPageData;
	}

	let { data }: Props = $props();

	let page = $state(1);
	let itemsPerPage = 25;

	let list = $state<IShortLink[]>([]);

	let query = $state('');

	function infiniteHandler({ detail: { loaded, complete } }: InfiniteEvent) {
		adminApiClient.baseApiRequest('GET', `/crud/shortLinks?page=${page}&pageSize=${itemsPerPage}&query=${query}`)
			.then((res) => {
				if (res.results.length === 0) {
					complete();
					return;
				}

				list = [...res.results, ...list].sort((a, b) => b.createdAt - a.createdAt);
				page += 1;
				loaded();
			})
			.catch((err) => {
				console.error(err);
				complete();
			});
	}
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Links" />
		<p class="mb-8">
			User created shortened links. If you want to create your own, visit the <A
				href="/link-generator">Link Generator page</A
			>.
		</p>
		<Table striped shadow class="w-full max-h-96">
			<TableHead>
				<TableHeadCell padding="p-4">Suffix</TableHeadCell>
				<TableHeadCell padding="p-4">Link</TableHeadCell>
				<TableHeadCell padding="p-4">Password</TableHeadCell>
				<TableHeadCell padding="p-4">Created At</TableHeadCell>
				<TableHeadCell padding="p-4">Uses</TableHeadCell>
				<TableHeadCell padding="p-4">Actions</TableHeadCell>
			</TableHead>
			<TableBody>

				{#each list as item (item.id)}
					<EditableLink link={item} onUpdate={()=>console.log("TODO")} onRemove={()=>console.log("TODO")} />
				{/each}
				<TableBodyRow>
					<td colspan="6">
						<InfiniteLoading on:infinite={infiniteHandler} forceUseInfiniteWrapper="html" />
					</td>
				</TableBodyRow>
			</TableBody>
		</Table>

		<table>
			<thead>
				<tr>
					<th>Short Link</th>
					<th>Link</th>
					<th>Password</th>
					<th>Created At</th>
					<th>Uses</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<!-- {#each list as item (item.id)}
					<EditableLink link={item} onUpdate={()=>console.log("TODO")} onRemove={()=>console.log("TODO")} />
				{/each} -->
			</tbody>
		</table>
	</div>
</div>
