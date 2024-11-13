<script lang="ts">
	import {
		Select,
		Table,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		TableHead,
		TableHeadCell,
		type SelectOptionType
	} from 'flowbite-svelte';

	interface Props {
		scheduleOptions: SelectOptionType<number>[];
		defaults?: number[];
	}

	let { scheduleOptions = [], defaults = $bindable([]) }: Props = $props();
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
				{#each defaults as _, i}
					<TableBodyCell class="px-1">
						<Select
							bind:value={defaults[i]}
							items={scheduleOptions}
							size="sm"
							placeholder="Choose Schedule"
						/>
					</TableBodyCell>
				{/each}
			</TableBodyRow>
		</TableBody>
	</Table>
</div>
