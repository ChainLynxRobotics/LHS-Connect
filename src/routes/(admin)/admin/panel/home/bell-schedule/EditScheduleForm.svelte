<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
    import type { BellSchedule, TimeString } from "$lib/types/HomePageData";
    import bellScheduleSchema, { bellSchedulePeriodSchemaName } from "$lib/schemas/bellScheduleSchema";
	import ValidatedTextarea from "$components/form/ValidatedTextarea.svelte";
	import { Button, Checkbox, Table, TableBodyCell, TableHead, TableHeadCell } from "flowbite-svelte";
	import DraggableList from "$components/admin/DraggableList.svelte";
	import { createEventDispatcher } from "svelte";
	import { dragHandle } from "svelte-dnd-action";
	import DragHandleOutline from "$components/admin/DragHandleOutline.svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";


    export let schedule: BellSchedule;
    $: schedule = JSON.parse(JSON.stringify(schedule)); // Deep copy
    export let onSave: (schedule: BellSchedule) => void;

    const dispatch = createEventDispatcher<{
        close: null;
    }>();

    let nameInput: ValidatedInput<'name'>;
    let descInput: ValidatedTextarea<'desc'>;
    let periodNames: ValidatedInput<string>[] = [];
    let periodStarts: HTMLInputElement[] = [];
    let periodEnds: HTMLInputElement[] = [];
    let periodEmphasizes: Checkbox[] = [];

    function handleAddPeriod() {
        schedule.periods.push({name: 'Period', start: '00:00', end: '00:00', emphasis: false});
        schedule = schedule; // Force update
    }

    function handleDeletePeriod(index: number) {
        schedule.periods.splice(index, 1);
        schedule = schedule; // Force update
    }

    async function handleSave() {
        if (![
            ...(await Promise.all(periodNames.map((input) => input.validate(true)))),
            await nameInput.validate(true), await descInput.validate(true)
            // Start times and end times are validated by the browser
        ].every(v=>v)) return; // If one of the validations failed, don't save

        onSave({
            name: nameInput.value||'',
            desc: descInput.value,
            periods: schedule.periods.map((period, i) => ({
                name: periodNames[i].value||'',
                start: periodStarts[i].value as TimeString,
                end: periodEnds[i].value as TimeString,
                emphasis: period.emphasis
            }))
        });
    }
</script>

<form on:submit|preventDefault={handleSave} class="flex flex-col gap-2 items-center">
    <div>
        <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Schedule</h3>
    </div>
    <div class="w-full max-w-xs">
        <ValidatedInput
            bind:this={nameInput} 
            id="name" 
            label="Name" 
            value={schedule.name} 
            validatorObject={bellScheduleSchema}
            visuallyRequired
        />
    </div>
    <div class="w-full max-w-lg">
        <ValidatedTextarea
            bind:this={descInput}
            id="desc"
            label="Description"
            value={schedule.desc}
            validatorObject={bellScheduleSchema}
        />
    </div>

    <div class="w-full">
        <Table striped>
            <TableHead>
                <TableHeadCell></TableHeadCell>
                <TableHeadCell>Period</TableHeadCell>
                <TableHeadCell>Start Time</TableHeadCell>
                <TableHeadCell>End Time</TableHeadCell>
                <TableHeadCell>Bold</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <DraggableList 
                dragZoneType="periods"
                items={schedule.periods} 
                update={(periods)=>schedule.periods = periods} 
                let:item 
                let:index
                sectionElement="tbody"
                sectionClass="divide-y text-start"
                dragWrapperElement="tr"
                dragWrapperClass="group border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
            >
                <td use:dragHandle class="pl-6 py-4">
                    <div class="flex items-center">
                        <DragHandleOutline />
                    </div>
                </td>
                <TableBodyCell tdClass="min-w-48 px-6 py-4 whitespace-nowrap font-medium">
                    <ValidatedInput
                        bind:this={periodNames[index]}
                        id={`period-${index}-name`}
                        value={schedule.periods[index].name}
                        validator={bellSchedulePeriodSchemaName}
                        visuallyRequired
                    />
                </TableBodyCell>
                <TableBodyCell>
                    <input 
                        bind:this={periodStarts[index]}
                        id={`period-${index}-start`}
                        name={`period-${index}-start`}
                        type="time"
                        aria-label="Start Time"
                        value={schedule.periods[index].start}
                        class="border-0 ring-primary-500 bg-white dark:bg-gray-800 dark:border-gray-700 group-odd:bg-white group-even:bg-gray-50 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
                    />
                </TableBodyCell>
                <TableBodyCell>
                    <input 
                        bind:this={periodEnds[index]}
                        id={`period-${index}-end`}
                        name={`period-${index}-end`}
                        type="time"
                        aria-label="End Time"
                        value={schedule.periods[index].end}
                        class="border-0 ring-primary-500 bg-white dark:bg-gray-800 dark:border-gray-700 group-odd:bg-white group-even:bg-gray-50 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
                    />
                </TableBodyCell>
                <TableBodyCell>
                    <Checkbox 
                        bind:this={periodEmphasizes[index]}
                        id={`period-${index}-emphasize`}
                        name={`period-${index}-emphasize`}
                        type="checkbox"
                        aria-label="Emphasize"
                        bind:checked={schedule.periods[index].emphasis}
                    />
                </TableBodyCell>
                <TableBodyCell>
                    <div class="flex">
                        <button type="button" on:click={()=>handleDeletePeriod(index)} class="!p-2"><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button>
                    </div>
                </TableBodyCell>
            </DraggableList>
        </Table>
    </div>

    <div class="mt-2">
        <Button type="button" color="alternative" on:click={handleAddPeriod}>Add Period</Button>
    </div>

    <div class="flex gap-4 mt-6 mb-4">
        <Button type="button" color="alternative" on:click={()=>dispatch('close')}>Cancel</Button>
        <Button type="submit">Save</Button>
    </div>
</form>
