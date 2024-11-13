<script lang="ts">
	import CrudList from '$components/admin/CRUDList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import clubs from '$lib/fake_data/clubs';
	import type { ClubPageData } from '$lib/types/ClubPageData';
	import { Button, Table, TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';
	import AutoImportClubsButton from './AutoImportClubsButton.svelte';
	import EditableClub from './EditableClub.svelte';

	interface Props {
		data: ClubPageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-7xl">
		<SectionHeader title="Club List" />
		<p class="mb-8">Alphabetical list of clubs</p>
		<CrudList
			initialItems={data.clubs}
			generateNewItem={() => ({
				name: '_New Club',
				day: '',
				time: '',
				location: '',
				advisor: ''
			})}
			sortFn={(a, b) => a.name.localeCompare(b.name)}
			canReorder={false}
		>
			{#snippet renderItems({ items, create, updateAll })}
				<div class="mb-8 flex justify-center gap-8">
					<Button color="alternative" on:click={create}>Add Club</Button>
					<AutoImportClubsButton onSubmit={updateAll} />
				</div>

				<Table striped shadow class="min-w-[1024px] table-fixed">
					<TableHead>
						<TableHeadCell>Name</TableHeadCell>
						<TableHeadCell>Day</TableHeadCell>
						<TableHeadCell>Time</TableHeadCell>
						<TableHeadCell>Location</TableHeadCell>
						<TableHeadCell>Advisor</TableHeadCell>
						<TableHeadCell>Instagram</TableHeadCell>
						<TableHeadCell>Actions</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each items as { item, update, duplicate, remove } (item.id)}
							<EditableClub
								club={item}
								onUpdate={update}
								onDuplicate={duplicate}
								onRemove={remove}
							/>
						{/each}
					</TableBody>
				</Table>
			{/snippet}
		</CrudList>
	</div>
</div>
