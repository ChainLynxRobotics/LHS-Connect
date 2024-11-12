<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import type { BellSchedule } from '$lib/types/HomePageData';
	import bellScheduleSchema, {
		bellSchedulePeriodSchemaName
	} from '$lib/schemas/bellScheduleSchema';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import { Button, Checkbox, Table, TableBodyCell, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { dragHandle, dragHandleZone } from 'svelte-dnd-action';
	import DragHandleOutline from '$components/admin/DragHandleOutline.svelte';
	import { FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { flip } from 'svelte/animate';

	const flipDurationMs = 300;

	interface Props {
		schedule: BellSchedule;
		onSubmit: (schedule: BellSchedule) => void;
		onCancel: () => void;
	}

	let { schedule, onSubmit: submit, onCancel: cancel }: Props = $props();

	let name = $state(schedule.name);
	let desc = $state(schedule.desc);
	let periods = $state(schedule.periods.map((period) => ({ ...period, id: Math.random() })));

	let nameInput: ValidatedInput<'name'>|undefined = $state();
	let descInput: ValidatedTextarea<'desc'>|undefined = $state();
	let periodNameInputs: ValidatedInput<string>[] = $state([]);

	function handleAdd() {
		periods.push({
			name: 'Period',
			start: '00:00',
			end: '00:00',
			emphasis: false,
			id: Math.random()
		});
		periods = periods; // Force update
	}

	function handleDuplicate(index: number) {
		periods.splice(index, 0, { ...periods[index], id: Math.random() });
		periods = periods; // Force update
	}

	function handleDelete(index: number) {
		periods.splice(index, 1);
		periods = periods; // Force update
	}

	async function onsubmit(event: Event) {
		event.preventDefault();
		// Validate all inputs
		for (let periodInput of periodNameInputs) {
			await periodInput.validate();
		}

		submit({
			id: schedule.id,
			name: await nameInput!.validate(),
			desc: await descInput!.validate(),
			periods: periods.map((period) => ({ ...period, id: undefined }))
		});
	}

	function handleDragConsider(event: CustomEvent<{ items: any[] }>) {
		periods = event.detail.items;
	}
	function handleDragFinalize(event: CustomEvent<{ items: any[] }>) {
		periods = event.detail.items;
	}
</script>

<form {onsubmit} class="flex flex-col items-center gap-2">
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
				use:dragHandleZone={{ type: 'periods', items: periods, flipDurationMs }}
				onconsider={handleDragConsider}
				onfinalize={handleDragFinalize}
			>
				{#each periods as period, index (period.id)}
					<tr
						animate:flip={{ duration: flipDurationMs }}
						class="group border-b bg-white last:border-b-0 odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
					>
						<td use:dragHandle class="py-4 pl-6">
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
								class="border-0 bg-white ring-primary-500 group-odd:bg-white group-even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
							/>
						</TableBodyCell>
						<TableBodyCell>
							<input
								id={`period-${index}-end`}
								name={`period-${index}-end`}
								type="time"
								aria-label="End Time"
								bind:value={period.end}
								class="border-0 bg-white ring-primary-500 group-odd:bg-white group-even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 group-odd:dark:bg-gray-800 group-even:dark:bg-gray-700"
							/>
						</TableBodyCell>
						<TableBodyCell>
							<Checkbox
								id={`period-${index}-emphasize`}
								name={`period-${index}-emphasize`}
								aria-label="Emphasize"
								bind:checked={period.emphasis}
							/>
						</TableBodyCell>
						<TableBodyCell>
							<div class="flex">
								<button type="button" onclick={() => handleDuplicate(index)} class="!p-2"
									><FileCopyOutline class="h-6 w-6" /></button
								>
								<button type="button" onclick={() => handleDelete(index)} class="!p-2"
									><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
								>
							</div>
						</TableBodyCell>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>

	<div class="mt-2">
		<Button type="button" color="alternative" on:click={handleAdd}>Add Period</Button>
	</div>

	<div class="mb-4 mt-6 flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
