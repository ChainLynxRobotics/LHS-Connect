<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
    import type { BellSchedule } from "$lib/types/HomePageData";
    import bellScheduleSchema, { bellSchedulePeriodSchemaName } from "$lib/schemas/bellScheduleSchema";
	import ValidatedTextarea from "$components/form/ValidatedTextarea.svelte";
	import { Button, Table, TableBodyCell, TableHead, TableHeadCell } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";
	import { dragHandle, dragHandleZone } from "svelte-dnd-action";
	import DragHandleOutline from "$components/admin/DragHandleOutline.svelte";
    import { FileCopyOutline, TrashBinOutline } from "flowbite-svelte-icons";
	import CheckboxWithAccessors from "$components/form/CheckboxWithAccessors.svelte";
	import { flip } from "svelte/animate";

    const flipDurationMs = 300;

    export let schedule: BellSchedule;
    export let onSave: (schedule: BellSchedule) => void;

    const dispatch = createEventDispatcher<{
        close: null;
    }>();

    let name = schedule.name;
    let desc = schedule.desc;
    let periods = schedule.periods.map((period) => ({...period, id: Math.random()}));

    let nameInput: ValidatedInput<'name'>;
    let descInput: ValidatedTextarea<'desc'>;
    let periodNameInputs: ValidatedInput<string>[] = [];
    

    function handleAddPeriod() {
        periods.push({name: 'Period', start: '00:00', end: '00:00', emphasis: false, id: Math.random()});
        periods = periods; // Force update
    }

    function handleDuplicatePeriod(index: number) {
        periods.splice(index, 0, {...periods[index], id: Math.random()});
        periods = periods; // Force update
    }   

    function handleDeletePeriod(index: number) {
        periods.splice(index, 1);
        periods = periods; // Force update
    }

    async function handleSave() {
        if (![
            ...(await Promise.all(periodNameInputs.map((input) => input.validate(true)))),
            await nameInput.validate(true), await descInput.validate(true)
            // Start times and end times are validated by the browser
        ].every(v=>v)) return; // If one of the validations failed, don't save

        onSave({
            name,
            desc,
            periods: periods.map((period) => ({...period, id: undefined}))
        });
    }

    function handleDragConsider(event: CustomEvent<{items: any[]}>) {
        periods = event.detail.items;
    }
    function handleDragFinalize(event: CustomEvent<{items: any[]}>) {
        periods = event.detail.items;
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
            bind:value={name} 
            validatorObject={bellScheduleSchema}
            visuallyRequired
        />
    </div>
    <div class="w-full max-w-lg">
        <ValidatedTextarea
            bind:this={descInput}
            id="desc"
            label="Description"
            bind:value={desc}
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
            <tbody
                use:dragHandleZone={{type: 'periods', items: periods, flipDurationMs}}
                on:consider={handleDragConsider}
                on:finalize={handleDragFinalize}
            >
                {#each periods as period, index (period.id)}
                    <tr animate:flip={{duration: flipDurationMs}} class="group border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                        <td use:dragHandle class="pl-6 py-4">
                            <div class="flex items-center">
                                <DragHandleOutline />
                            </div>
                        </td>
                        <TableBodyCell tdClass="min-w-48 px-6 py-4 whitespace-nowrap font-medium">
                            <ValidatedInput
                                bind:this={periodNameInputs[index]}
                                id={`period-${index}-name`}
                                bind:value={period.name}
                                validator={bellSchedulePeriodSchemaName}
                                visuallyRequired
                            />
                        </TableBodyCell>
                        <TableBodyCell>
                            <input 
                                id={`period-${index}-start`}
                                name={`period-${index}-start`}
                                type="time"
                                aria-label="Start Time"
                                bind:value={period.start}
                                class="border-0 ring-primary-500 bg-white dark:bg-gray-800 dark:border-gray-700 group-odd:bg-white group-even:bg-gray-50 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
                            />
                        </TableBodyCell>
                        <TableBodyCell>
                            <input 
                                id={`period-${index}-end`}
                                name={`period-${index}-end`}
                                type="time"
                                aria-label="End Time"
                                bind:value={period.end}
                                class="border-0 ring-primary-500 bg-white dark:bg-gray-800 dark:border-gray-700 group-odd:bg-white group-even:bg-gray-50 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
                            />
                        </TableBodyCell>
                        <TableBodyCell>
                            <CheckboxWithAccessors
                                checkboxProps={{
                                    id: `period-${index}-emphasize`,
                                    name: `period-${index}-emphasize`,
                                    'aria-label': 'Emphasize'
                                }}
                                bind:checked={period.emphasis}
                            />
                        </TableBodyCell>
                        <TableBodyCell>
                            <div class="flex">
                                <button type="button" on:click={()=>handleDuplicatePeriod(index)} class="!p-2"><FileCopyOutline class="h-6 w-6" /></button>
                                <button type="button" on:click={()=>handleDeletePeriod(index)} class="!p-2"><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button>
                            </div>
                        </TableBodyCell>
                    </tr>
                {/each}
            </tbody>
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
