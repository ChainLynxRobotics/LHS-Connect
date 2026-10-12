<script lang="ts">
	import type { ClubListData, IClub } from '$api/page_data/clubs/types';
	import ExternalLink from '$components/ExternalLink.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import {
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Popover,
	} from 'flowbite-svelte';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import Fuse from 'fuse.js';

	interface Props {
		data: ClubListData;
	}

	let { data }: Props = $props();

	let search = $state('');

	let fuse = $derived(
		new Fuse(data.clubs, {
			keys: [
				{ name: 'name', weight: 5 },
				{ name: 'desc', weight: 4 },
				{ name: 'dayAndTime', weight: 1 },
				{ name: 'location', weight: 1 },
				{ name: 'advisor', weight: 1 },
			],
		})
	);

	let searchedClubs = $derived(
		search.trim().length === 0 ? data.clubs : fuse.search(search).map((result) => result.item)
	);
</script>

<div class="px-4">
	<SectionHeader title="List of Lincoln Clubs" updatedAt={data.clubs} />
</div>
<div class="mb-4 mt-8 flex items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<Search size="md" placeholder="Search" bind:value={search} />
	</div>
</div>
<Table striped shadow class="hidden table-fixed sm:table">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Day & Time</TableHeadCell>
		<TableHeadCell>Location</TableHeadCell>
		<TableHeadCell>Advisor</TableHeadCell>
		<TableHeadCell>Instagram</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each searchedClubs as club}
			<TableBodyRow>
				<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
					{club.name}
					{#if club.desc}
						<InfoCircleOutline class="inline h-4 w-4 text-gray-500 dark:text-gray-400" />
						<Popover title={club.name} placement="top-start" class="max-w-lg">
							{club.desc}
						</Popover>
					{/if}
				</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.dayAndTime}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.location}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.advisor}</TableBodyCell>
				<TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
					{#if club.instagram && club.instagram !== 'N/A'}
						<ExternalLink href="https://instagram.com/{club.instagram}" text="@{club.instagram}" />
					{:else}
						<p class="font-bold text-gray-400 dark:text-gray-300">N/A</p>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
<div class="mx-auto flex flex-col font-sans sm:hidden">
	<main class="flex-1 divide-y divide-gray-200 overflow-y-auto dark:divide-gray-700">
		{#each searchedClubs as club}
			<div
				class="flex flex-col bg-white p-4 transition-colors even:bg-gray-50 dark:bg-gray-800 dark:even:bg-gray-700"
			>
				<div class="flex w-full items-start justify-between">
{#if club.desc}
						<InfoCircleOutline class="mr-2 inline h-8 w-8 text-gray-500 dark:text-gray-400" />
						<Popover title={club.name} placement="top-start" class="max-w-lg">
							{club.desc}
						</Popover>
					{/if}
					<div class="-mx-0.5 flex flex-1 flex-col pr-4">
						<h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
							{club.name}
						</h2>
						<span class="mt-0.5 text-[0.8125rem] font-semibold text-gray-600 dark:text-gray-300">
							{club.advisor} | {club.location}
						</span>
					</div>

					<div class="flex-shrink-0 -translate-y-2 pl-2 text-right">
						{#if club.instagram && club.instagram !== 'N/A'}
							<ExternalLink
								href="https://instagram.com/{club.instagram}"
								text="@{club.instagram}"
								AdditionalClasses="!font-bold text-md"
							/>
						{/if}
					</div>
				</div>

				<div class="mt-2 w-full">
					<p class="text-sm font-bold text-gray-500 dark:text-gray-400">{club.dayAndTime}</p>
				</div>
			</div>
		{/each}
	</main>
</div>
