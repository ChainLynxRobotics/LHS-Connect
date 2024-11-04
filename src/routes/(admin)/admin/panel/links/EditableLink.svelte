<script lang="ts">
	import type { AdminShortLinkData, ShortLinkData } from "$lib/types/LinkGeneratorData";
	import { Modal, TableBodyCell, TableBodyRow, Tooltip, A } from "flowbite-svelte";
	import { EditOutline, TrashBinOutline } from "flowbite-svelte-icons";
	import { DateTime } from "luxon";
	import { createEventDispatcher } from "svelte";
	import EditLinkForm from "./EditLinkForm.svelte";

    export let link: AdminShortLinkData;

    const dispatch = createEventDispatcher<{
		edit: ShortLinkData;
		delete: null;
	}>();

    let editModalOpen = false;

    function handleEditModalSubmit(e: CustomEvent<ShortLinkData>) {
		dispatch('edit', e.detail);
		editModalOpen = false;
	}
</script>

<TableBodyRow>
    <TableBodyCell tdClass="p-4 font-medium max-w-sm">{link.suffix}</TableBodyCell>
    <TableBodyCell tdClass="p-4 font-medium max-w-sm"><A href="{link.url}" target="_blank" rel="noreferrer">{link.url}</A></TableBodyCell>
    <TableBodyCell tdClass="p-4 font-medium max-w-sm">
        {#if link.password}
            <span>••••••••</span>
            <Tooltip>{link.password}</Tooltip>
        {/if}
    </TableBodyCell>
    <TableBodyCell tdClass="p-4 font-medium max-w-sm">{DateTime.fromMillis(link.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</TableBodyCell>
    <TableBodyCell tdClass="p-4 font-medium max-w-sm">{link.uses}</TableBodyCell>
    <TableBodyCell tdClass="p-2 font-medium max-w-sm align-top">
        <div class="flex justify-center">
            <button title="Edit" on:click|stopPropagation={() => (editModalOpen = true)} class="!p-2"
                ><EditOutline class="h-6 w-6" /></button
            >
            <Tooltip>Edit</Tooltip>

            <button title="Delete" on:click|stopPropagation={() => dispatch('delete')} class="!p-2"
                ><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
            >
            <Tooltip>Delete</Tooltip>
        </div>
    </TableBodyCell>
</TableBodyRow>

<Modal bind:open={editModalOpen} size="sm" autoclose={false}>
	<EditLinkForm
		{link}
		on:submit={handleEditModalSubmit}
		on:cancel={() => (editModalOpen = false)}
	/>
</Modal>