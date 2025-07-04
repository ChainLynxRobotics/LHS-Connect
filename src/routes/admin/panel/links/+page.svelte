<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import {
		A,
		Input,
		Label,
		PaginationItem,
		Select,
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
	} from 'flowbite-svelte';
	import EditableLink from './EditableLink.svelte';
	import adminApiClient from '$lib/util/adminApiClient';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
	import type { IPublicShortLink, IShortLinkAdminUpdate } from '$api/short_link/types';

	const notificationContext = getNotificationContext();

	let page = $state(1);
	let itemsPerPage = $state(10);
	let total = $state(0);

	let list = $state<IPublicShortLink[]>([]);

	let search = $state('');
	let orderBy = $state('createdAt');
	let order = $state<'desc' | 'asc'>('desc');

	$effect(refresh);

	function refresh() {
		adminApiClient
			.baseApiRequest(
				'GET',
				`/short_link/edit?page=${page}&pageSize=${itemsPerPage}&search=${search}&orderBy=${orderBy}&order=${order}`
			)
			.then((res) => {
				list = res.results;
				total = res.total;
				if (page > 1 && list.length === 0) {
					page--;
					refresh();
				}
			})
			.catch((e) => notificationContext.show(e.message, 'error'));
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

	function update(id: IPublicShortLink['id'], link: IShortLinkAdminUpdate) {
		adminApiClient
			.baseApiRequest('PATCH', `/short_link/edit/${id}`, link)
			.then((res) => {
				const index = list.findIndex((item) => item.id === id);
				list[index] = res.result;
			})
			.catch((e) => notificationContext.show(e.message, 'error'));
	}

	function remove(id: IPublicShortLink['id']) {
		list = list.filter((item) => item.id !== id);
		adminApiClient
			.baseApiRequest('DELETE', `/short_link/edit/${id}`)
			.catch((e) => notificationContext.show(e.message, 'error'))
			.finally(refresh);
	}

	const pageSizes = [
		{ value: 10, name: '10' },
		{ value: 25, name: '25' },
		{ value: 50, name: '50' },
		{ value: 100, name: '100' },
	];

	const sortByOptions = [
		{ value: 'suffix', name: 'Suffix' },
		{ value: 'url', name: 'Link' },
		{ value: 'createdAt', name: 'Date Created' },
		{ value: 'uses', name: 'Uses' },
	];

	const sortOptions = [
		{ value: 'asc', name: 'Ascending' },
		{ value: 'desc', name: 'Descending' },
	];
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-6xl">
		<SectionHeader title="Short Links" />
		<p class="mb-6">
			User created shortened links. If you want to create your own, visit the <A
				href="/link-generator">Link Generator page</A
			>.
		</p>

		<div class="mb-4 flex w-full items-end justify-between gap-6">
			<PaginationItem large class="hidden items-center md:flex" on:click={prev}>
				<ArrowLeftOutline class="me-2 h-5 w-5" />
				Prev
			</PaginationItem>
			<div class="flex flex-wrap items-end justify-center gap-6 md:flex-nowrap">
				<div>
					<Label for="search" class="mb-2">Search</Label>
					<Input
						bind:value={search}
						on:change={() => (page = 1)}
						type="text"
						id="search"
						placeholder="Suffix or link"
					/>
				</div>
				<div>
					<Label for="search" class="mb-2">Order By</Label>
					<Select
						bind:value={orderBy}
						on:change={() => (page = 1)}
						id="orderby"
						size="sm"
						items={sortByOptions}
					/>
				</div>
				<div>
					<Label for="desc" class="mb-2">Order</Label>
					<Select
						bind:value={order}
						on:change={() => (page = 1)}
						id="order"
						size="sm"
						items={sortOptions}
					/>
				</div>
				<div>
					<Label for="pageSize" class="mb-2">Per page:</Label>
					<Select
						bind:value={itemsPerPage}
						on:change={() => (page = 1)}
						id="pageSize"
						size="sm"
						items={pageSizes}
					/>
				</div>
			</div>
			<PaginationItem large class="hidden items-center md:flex" on:click={next}>
				Next
				<ArrowRightOutline class="ms-2 h-5 w-5" />
			</PaginationItem>
		</div>

		<div class="text-center text-sm text-gray-700 dark:text-gray-400">
			Showing
			<span class="font-semibold text-gray-900 dark:text-white"
				>{Math.min((page - 1) * itemsPerPage + 1, total)}</span
			>
			to
			<span class="font-semibold text-gray-900 dark:text-white"
				>{Math.min((page - 1) * itemsPerPage + list.length, total)}</span
			>
			of
			<span class="font-semibold text-gray-900 dark:text-white">{total}</span>
			results
		</div>

		<Table striped shadow class="max-h-96 w-full">
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
					<EditableLink
						link={item}
						onUpdate={(i) => update(item.id, i)}
						onRemove={() => remove(item.id)}
					/>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
