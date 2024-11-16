<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import {
		TableBodyCell,
		TableBodyRow,
		Select,
		type SelectOptionType,
		Tooltip
	} from 'flowbite-svelte';
	import { FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { DateTime } from 'luxon';
	import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
	import type { IBellScheduleOverride } from '$lib/types/crud/bellScheduleOverride';
	import type { WithoutID } from '$lib/types/crud/globalCrud';

	interface Props {
		special: IBellScheduleOverride;
		scheduleOptions: SelectOptionType<IBellSchedule['id']>[];
		onUpdate: (e: WithoutID<IBellScheduleOverride>) => void;
		onDuplicate: () => void;
		onRemove: () => void;
	}

	let { special, scheduleOptions, onUpdate, onDuplicate, onRemove }: Props = $props();

	let date = $state(DateTime.fromMillis(special.date).toISODate()); // To avoid reactivity issues with the sorted array
	let scheduleId = $state(special.scheduleId);

	function submit() {
		onUpdate({
			date: DateTime.fromISO(date || '')
				.setZone('America/Los_Angeles')
				.startOf('day')
				.toMillis(),
			scheduleId
		});
	}
</script>

<TableBodyRow>
	<TableBodyCell class="px-1">
		<input
			id={`special-date-${special.id}`}
			name={`special-date-${special.id}`}
			type="date"
			aria-label="Date of schedule override"
			bind:value={date}
			onblur={submit}
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
			<button title="Duplicate" onclick={onDuplicate} class="!p-2"
				><FileCopyOutline class="h-6 w-6" /></button
			>
			<Tooltip>Duplicate</Tooltip>
			<button title="Delete" onclick={onRemove} class="!p-2"
				><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
			>
			<Tooltip>Delete</Tooltip>
		</div>
	</TableBodyCell>
</TableBodyRow>
