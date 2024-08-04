<script lang="ts">
	import ExternalLink from "$components/ExternalLink.svelte";
    import type { Club } from "$lib/types/ClubPageData";
	import { Search, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { stringSimilarity } from "string-similarity-js";

    export let clubs: Club[];


    let search = "";

    $: filteredClubs = search.trim().length === 0 ? clubs : clubs.map(club => ({
        club,
        score: stringSimilarity(club.name, search),
    })).filter(({ score }) => score > 0.5).sort((a, b) => b.score - a.score).map(({ club }) => club);

    $: console.log(filteredClubs);
    $: console.log(search);
</script>

<div class="flex justify-center items-center mb-4">
    <div class="w-full max-w-sm">
        <Search size="md" placeholder="Search by Club Name" bind:search />
    </div>
</div>
<Table striped shadow >
    <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Day</TableHeadCell>
        <TableHeadCell>Time</TableHeadCell>
        <TableHeadCell>Location</TableHeadCell>
        <TableHeadCell>Advisor</TableHeadCell>
        <TableHeadCell>Instagram</TableHeadCell>
    </TableHead>
    <TableBody>
        {#each filteredClubs as club}
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
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>