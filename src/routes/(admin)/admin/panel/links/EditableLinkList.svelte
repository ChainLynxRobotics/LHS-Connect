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
    <Table striped shadow class="w-full">
        <TableHead>
            <TableHeadCell>Suffix</TableHeadCell>
            <TableHeadCell>Link</TableHeadCell>
            <TableHeadCell>Password</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
            <TableHeadCell>Uses</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
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