<script lang="ts">
	import { TableBodyCell, TableBodyRow, Select, type SelectOptionType, Tooltip } from "flowbite-svelte";
	import { FileCopyOutline, TrashBinOutline } from "flowbite-svelte-icons";
	import { createEventDispatcher } from "svelte";
	import type { ScheduleOverride } from "$lib/types/HomePageData";
	import { DateTime } from "luxon";

    export let i: number;
    export let special: ScheduleOverride;
    export let scheduleOptions: SelectOptionType<number>[]

    let date = DateTime.fromMillis(special.date).toISODate(); // To avoid reactivity issues with the sorted array
    let scheduleId = special.scheduleId;

    const dispatch = createEventDispatcher<{
		edit: ScheduleOverride; // Not used
		duplicate: null;
		delete: null;
	}>();

    function submit() {
        special.date = DateTime.fromISO(date || '').setZone("America/Los_Angeles").startOf("day").toMillis();
        special.scheduleId = scheduleId;
        dispatch('edit', special);
    }

</script>

<TableBodyRow>
    <TableBodyCell class="px-1">
        <input
            id={`special-date-${i}`}
            name={`special-date-${i}`}
            type="date"
            aria-label="Date of schedule override"
            bind:value={date}
            on:blur={submit}
            class="border-0 bg-white ring-primary-500 group-odd:bg-white group-even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
        />
    </TableBodyCell>
    <TableBodyCell class="px-1">
        <Select 
            bind:value={scheduleId} 
            on:change={submit} 
            items={scheduleOptions} 
            size="sm" 
            placeholder="Choose Schedule"
        />
    </TableBodyCell>
    <TableBodyCell class="px-1">
        <div class="flex justify-end">
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

