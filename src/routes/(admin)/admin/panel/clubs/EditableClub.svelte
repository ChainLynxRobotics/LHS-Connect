<script lang="ts">
	import ExternalLink from "$components/ExternalLink.svelte";
	import type { Club } from "$lib/types/ClubPageData";
	import { Modal, TableBodyCell, TableBodyRow, Tooltip } from "flowbite-svelte";
	import { EditOutline, FileCopyOutline, TrashBinOutline } from "flowbite-svelte-icons";
	import { createEventDispatcher } from "svelte";
	import EditClubForm from "./EditClubForm.svelte";

    export let club: Club;

    const dispatch = createEventDispatcher<{
		edit: Club;
		duplicate: null;
		delete: null;
	}>();

	let editModalOpen = false;

	function handleEditModalSubmit(e: CustomEvent<Club>) {
		dispatch('edit', e.detail);
		editModalOpen = false;
	}

</script>

<TableBodyRow>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.name}</TableBodyCell>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.day}</TableBodyCell>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.time}</TableBodyCell>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.location}</TableBodyCell>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">{club.advisor}</TableBodyCell>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
        {#if club.instagram}
            <ExternalLink href="https://instagram.com/{club.instagram}" text="@{club.instagram}" />
        {/if}
    </TableBodyCell>
    <TableBodyCell tdClass="px-6 py-4 font-medium max-w-sm">
        <div class="flex">
            <button title="Edit" on:click|stopPropagation={() => (editModalOpen = true)} class="!p-2"
                ><EditOutline class="h-6 w-6" /></button
            >
            <Tooltip>Edit</Tooltip>
            <button title="Duplicate" on:click|stopPropagation={() => dispatch('duplicate')} class="!p-2"
                ><FileCopyOutline class="h-6 w-6" /></button
            >
            <Tooltip>Duplicate</Tooltip>
            <button title="Delete" on:click|stopPropagation={() => dispatch('delete')} class="!p-2"
                ><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
            >
            <Tooltip>Delete</Tooltip>
        </div>
    </TableBodyCell>
</TableBodyRow>

<Modal bind:open={editModalOpen} size="sm" autoclose={false}>
	<EditClubForm
		{club}
		on:submit={handleEditModalSubmit}
		on:cancel={() => (editModalOpen = false)}
	/>
</Modal>