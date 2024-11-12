<script lang="ts">
	import type { Club } from '$lib/types/ClubPageData';
	import { Button, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import EditableClub from './EditableClub.svelte';
	import AutoImportClubsButton from './AutoImportClubsButton.svelte';

	interface Props {
		clubs: Club[];
	}

	let { clubs }: Props = $props();
	$effect(() => {
		clubs = clubs.sort((a, b) => a.name.localeCompare(b.name));
	});

	function handleNew() {
		clubs.push({
			name: '_New Club',
			day: '',
			time: '',
			location: '',
			advisor: ''
		});
		clubs = clubs; // Force update
	}

	function handleEdit(index: number, club: Club) {
		clubs[index] = club;
	}

	function handleDuplicate(index: number) {
		clubs.splice(index, 0, JSON.parse(JSON.stringify(clubs[index])));
		clubs = clubs; // Force update
	}

	function handleDelete(index: number) {
		clubs.splice(index, 1);
		clubs = clubs; // Force update
	}
</script>

<div class="w-full">
	<div class="mb-8 flex justify-center gap-8">
		<Button color="alternative" on:click={handleNew}>Add Club</Button>
		<AutoImportClubsButton onSubmit={(_clubs) => (clubs = _clubs)} />
	</div>

	<Table striped shadow class="table-fixed">
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
			{#each clubs as club, index}
				<EditableClub
					{club}
					onEdit={(club) => handleEdit(index, club)}
					onDuplicate={() => handleDuplicate(index)}
					onDelete={() => handleDelete(index)}
				/>
			{/each}
		</TableBody>
	</Table>
</div>
