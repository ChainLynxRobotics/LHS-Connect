<script lang="ts">
	import type { BellSchedule, ScheduleOverride } from "$lib/types/HomePageData";
	import { Button, Table, TableBody, TableHead, TableHeadCell } from "flowbite-svelte";
	import SpecialScheduleRow from "./SpecialScheduleRow.svelte";
	import { DateTime } from "luxon";


    export let schedules: readonly BellSchedule[] = [];

    export let specials: ScheduleOverride[] = [];
    specials = specials.sort((a, b)=>a.date-b.date); // Note: only sorts on initial load

    function handleNew() {
        specials.push({
            date: DateTime.now().setZone("America/Los_Angeles").startOf("day").toMillis(),
            scheduleId: schedules[0]?.id
        });
        specials = specials; // Force update
    }

    function handleEdit(index: number, special: ScheduleOverride) {
        specials[index] = special;
    }

    function handleDuplicate(index: number) {
		specials.splice(index, 0, JSON.parse(JSON.stringify(specials[index])));
		specials = specials; // Force update
	}

	function handleDelete(index: number) {
		specials.splice(index, 1);
		specials = specials; // Force update
	}

    $: scheduleOptions = schedules.map((item) => ({ value: item.id, name: item?.name || "Unknown" }));
</script>

<div class="w-full">
    <div class="flex justify-center mb-8 gap-8">
        <Button color="alternative" on:click={handleNew}>Add Schedule Override</Button>
    </div>
    <Table>
        <TableHead>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Schedule</TableHeadCell>
            <TableHeadCell class="text-right">Actions</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each specials as special, i}
                <SpecialScheduleRow 
                    i={i}
                    {special} 
                    {scheduleOptions}
                    on:edit={(e)=>handleEdit(i, e.detail)} 
                    on:duplicate={()=>handleDuplicate(i)} 
                    on:delete={()=>handleDelete(i)}
                />
            {/each}
        </TableBody>
    </Table>
</div>