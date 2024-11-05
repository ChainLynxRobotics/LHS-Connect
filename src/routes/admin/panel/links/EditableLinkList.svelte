<script lang="ts">
	import type { AdminShortLinkData, ShortLinkData } from "$lib/types/LinkGeneratorData";
	import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-svelte";
	import EditableLink from "./EditableLink.svelte";

    export let links: AdminShortLinkData[] = [];
    $: links = links.sort((a, b) => b.createdAt - a.createdAt);

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
    <Table striped shadow class="w-full table-fixed min-w-[896px]">
        <colgroup>
            <col style="width: 20%" />
            <col style="width: 30%" />
            <col style="width: 10%" />
            <col style="width: 20%" />
            <col style="width: 7.5%" />
            <col style="width: 12.5%" />
        </colgroup>
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
                <EditableLink {link} 
                    on:edit={(e) => handleEdit(index, e.detail)}
                    on:delete={() => handleDelete(index)}
                />
            {/each}
        </TableBody>
    </Table>
</div>