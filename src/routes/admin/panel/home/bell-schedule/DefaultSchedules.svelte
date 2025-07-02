<script lang="ts">
	import type { IBellSchedule } from '$api/page_data/bellSchedule/types';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import adminApiClient from '$lib/util/adminApiClient';
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
		scheduleOptions: SelectOptionType<IBellSchedule['id']>[];
		defaults?: IBellSchedule['id'][];
	}

	let { scheduleOptions = [], defaults = $bindable([]) }: Props = $props();

	const notificationContext = getNotificationContext();

	const refresh = async () => {
		const res = await adminApiClient.baseApiRequest('GET', '/crud/bellScheduleDefaults').catch((e) => {
			notificationContext.show(e.message, 'error');
		});
		defaults = res.results?.[0]?.bellScheduleIDs || [];
	};

	const update = async () => {
		await adminApiClient.baseApiRequest('POST', '/crud/bellScheduleDefaults', {bellScheduleIDs: defaults}).catch((e)=>{
			refresh();
			notificationContext.show(e.message, 'error');
		});
	};

	$effect(() => {
		// Ensure there are 7 defaults
		if (defaults.length < 7) {
			defaults = Array(7).fill(scheduleOptions[0]?.value); // May be undefined
		} else if (defaults.length > 7) {
			defaults = defaults.slice(0, 7);
		}
	});

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
							onchange={update}
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
