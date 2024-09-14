<script lang="ts">
	import type { Club } from "$lib/types/ClubPageData";
	import { Button, Table, TableBody, TableHead, TableHeadCell } from "flowbite-svelte";
	import EditableClub from "./EditableClub.svelte";
	import AutoImportClubsButton from "./AutoImportClubsButton.svelte";

    export let clubs: Club[] = [];
    $: clubs = clubs.sort((a, b) => a.name.localeCompare(b.name));

    function handleNew() {
        clubs.push({
            name: "_New Club",
            day: "",
            time: "",
            location: "",
            advisor: "",
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
    <div class="flex justify-center mb-8 gap-8">
        <Button color="alternative" on:click={handleNew}>Add Club</Button>
        <AutoImportClubsButton on:submit={(e)=>clubs = e.detail} />
    </div>

    <Table striped shadow>
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
                <EditableClub {club} 
                    on:edit={(e) => handleEdit(index, e.detail)}
                    on:duplicate={() => handleDuplicate(index)}
                    on:delete={() => handleDelete(index)}
                />
            {/each}
        </TableBody>
    </Table>
</div>