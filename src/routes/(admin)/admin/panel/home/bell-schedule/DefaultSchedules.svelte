<script lang="ts">
	import type { BellSchedule } from "$lib/types/HomePageData";
	import { Select, Table, TableBody, TableBodyRow, TableBodyCell, TableHead, TableHeadCell } from "flowbite-svelte";

    export let schedules: readonly BellSchedule[] = [];
    export let defaults: number[] = [];

    $: selectOptions = schedules.map((item) => ({ value: item.id, name: item?.name || "Unknown" }));
</script>

<div class="w-full">
    <Table>
        <TableHead>
            <TableHeadCell>Sunday</TableHeadCell>
            <TableHeadCell>Monday</TableHeadCell>
            <TableHeadCell>Tuesday</TableHeadCell>
            <TableHeadCell>Wednesday</TableHeadCell>
            <TableHeadCell>Thursday</TableHeadCell>
            <TableHeadCell>Friday</TableHeadCell>
            <TableHeadCell>Saturday</TableHeadCell>
        </TableHead>
        <TableBody>
            <TableBodyRow>
                {#each defaults as defaultSchedule, i}
                    <TableBodyCell class="px-1">
                        <Select bind:value={defaults[i]} items={selectOptions} size="sm" placeholder="Choose Schedule" />
                    </TableBodyCell>
                {/each}
            </TableBodyRow>
        </TableBody>
    </Table>
</div>