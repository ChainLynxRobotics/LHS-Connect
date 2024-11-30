<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { A, Input, Label, Pagination, Select, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import EditableLink from './EditableLink.svelte';
	import adminApiClient from '$lib/util/adminApiClient';
	import type { IShortLink, IShortLinkCreate } from '$lib/types/crud/shortLink';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';

	const notificationContext = getNotificationContext();

	let page = $state(1);
	let itemsPerPage = $state(10);
	let total = $state(0);

	let list = $state<IShortLink[]>([]);

	let search = $state('');
	let orderBy = $state('createdAt');
	let order = $state<'desc'|'asc'>('desc');


	$effect(refresh);
	
	function refresh() {
		adminApiClient.baseApiRequest('GET', `/crud/shortLinks?page=${page}&pageSize=${itemsPerPage}&search=${search}&orderBy=${orderBy}&order=${order}`).then((res) => {
			list = res.results;
			total = res.total;
			if (page > 1 && list.length === 0) {
				page--;
				refresh();
			}
		}).catch((e)=>notificationContext.show(e.message, 'error'));
	}

	function next() {
		if (page * itemsPerPage < total) {
			page++;
		}
	}

	function prev() {
		if (page > 1) {
			page--;
		}
	}

	function update(id: IShortLink['id'], link: IShortLinkCreate) {
		adminApiClient.baseApiRequest('PATCH', `/crud/shortLinks/${id}`, link).then((res) => {
			const index = list.findIndex((item) => item.id === id);
			list[index] = res.result;
		}).catch((e)=>notificationContext.show(e.message, 'error'));
	}

	function remove(id: IShortLink['id']) {
		list = list.filter((item) => item.id !== id);
		adminApiClient.baseApiRequest('DELETE', `/crud/shortLinks/${id}`)
			.catch((e)=>notificationContext.show(e.message, 'error'))
			.finally(refresh);
	}

	const pageSizes = [
		{ value: 10, name: '10' },
		{ value: 25, name: '25' },
		{ value: 50, name: '50' },
		{ value: 100, name: '100' }
	]

	const sortByOptions = [
		{ value: 'suffix', name: 'Suffix' },
		{ value: 'url', name: 'Link' },
		{ value: 'createdAt', name: 'Date Created' },
		{ value: 'uses', name: 'Uses' }
	]

	const sortOptions = [
		{ value: 'asc', name: 'Ascending' },
		{ value: 'desc', name: 'Descending' }
	]
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Links" />
		<p class="mb-6">
			User created shortened links. If you want to create your own, visit the <A
				href="/link-generator">Link Generator page</A
			>.
		</p>

		<div class="w-full flex items-center justify-center gap-6 mb-6">
			<div>
				<Label for="search" class="mb-2">Search</Label>
      			<Input bind:value={search} on:change={() => page = 1} type="text" id="search" placeholder="Suffix or link" />
			</div>
			<div>
				<Label for="search" class="mb-2">Order By</Label>
				<Select bind:value={orderBy} on:change={() => page = 1} id="orderby" size="sm" items={sortByOptions} />
			</div>
			<div>
				<Label for="desc" class="mb-2">Order</Label>
				<Select bind:value={order} on:change={() => page = 1} id="order" size="sm" items={sortOptions} />
			</div>
		</div>

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
					<EditableLink link={item} onUpdate={(i)=>update(item.id, i)} onRemove={()=>remove(item.id)} />
				{/each}
			</TableBody>
		</Table>
		<div class="flex flex-col items-center justify-center gap-2 mt-4">
			<div class="text-sm text-gray-700 dark:text-gray-400">
				Showing 
				<span class="font-semibold text-gray-900 dark:text-white">{Math.min((page - 1) * itemsPerPage + 1, total)}</span>
				to
				<span class="font-semibold text-gray-900 dark:text-white">{Math.min((page - 1) * itemsPerPage + list.length, total)}</span>
				of
				<span class="font-semibold text-gray-900 dark:text-white">{total}</span>
				Entries
			</div>

			<Pagination table pages={[]} large on:next={next} on:previous={prev}>
				<span slot="next">Next</span>
			  	<span slot="prev">Prev</span>
			</Pagination>
			<div class="flex items-center gap-2 whitespace-nowrap">
				<Label for="pageSize">Per page:</Label>
				<Select 
					bind:value={itemsPerPage} 
					on:change={() => page = 1}
					id="pageSize" 
					size="sm" 
					underline 
					items={pageSizes} 
					class="bg-white dark:bg-gray-900" />
			</div>
		</div>
	</div>
</div>
