<script lang="ts">
	import { Table, TableBody, TableHead, TableHeadCell, Tabs, TabItem } from 'flowbite-svelte';
	import Edit from './Edit.svelte';
	import type { PageData } from './$types';
	import type { EditLogProps, GenericEditLogProps } from './types';
	import type { IEditLog, IEditLogBase } from '$api/changelog/types';
	import type { IBulletinBoardNote } from '$api/page_data/bulletinBoard/types';
	import type { IAnnouncement } from '$api/page_data/announcement/types';
	import type { IClub } from '$api/page_data/clubs/types';
	import type { ILinkCard } from '$api/page_data/usefulLinks/types';
	import type {
		IBellSchedule,
		IBellScheduleDefaults,
		IBellScheduleOverride,
	} from '$api/page_data/bellSchedule/types';
	import type { IShortLinkEditData } from '$api/changelog/shortLinkModel';
	import { number } from 'yup';
	import type { GetAllResults } from '$lib/util/adminApiClient';
	import { AnnounceEdit } from '$api/changelog/announcementModel';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function processSingleEditLog<T>(
		editLogs: GetAllResults<IEditLog<T>>,
		genericEditLogs: { editLog: IEditLogBase; id: number }[],
		idCounter: { currentId: number }
	): { editLog: IEditLog<T>; id: number }[] {
		let indexedEditLogs: { editLog: IEditLog<T>; id: number }[] = [];
		for (let log of editLogs.results) {
			const id = idCounter.currentId;
			idCounter.currentId++;
			genericEditLogs.push({ editLog: log, id });
			indexedEditLogs.push({ editLog: log, id });
		}
		return indexedEditLogs;
	}

	// Stored inside an object to get pass by reference
	let idCounter: { currentId: number } = { currentId: 0 };
	let genericEditLogs: { editLog: IEditLogBase; id: number }[] = [];

	let announcementBoardEditLogs = processSingleEditLog(
		data.announcement,
		genericEditLogs,
		idCounter
	);
	let bulletinBoardEditLogs = processSingleEditLog(data.bulletin, genericEditLogs, idCounter);
	let clubEditLogs = processSingleEditLog(data.clubs, genericEditLogs, idCounter);
	let contactEditLogs = processSingleEditLog(data.contacts, genericEditLogs, idCounter);
	let linkEditLogs = processSingleEditLog(data.links, genericEditLogs, idCounter);
	let scheduleEditLogs = processSingleEditLog(data.schedules, genericEditLogs, idCounter);
	let defaultScheduleEditLogs = processSingleEditLog(
		data.defaultSchedules,
		genericEditLogs,
		idCounter
	);
	let scheduleOverrideEditLogs = processSingleEditLog(data.overrides, genericEditLogs, idCounter);
	let shortLinkEditLogs = processSingleEditLog(data.shortLinks, genericEditLogs, idCounter);

	// TODO: unify type defs
	let allItems: { editLog: IEditLogBase; id: number }[] = $derived(genericEditLogs);

	function dataType(genericLog: {
		editLog: IEditLogBase;
		id: number;
	}):
		| 'announcement'
		| 'bulletin'
		| 'clubs'
		| 'contacts'
		| 'links'
		| 'schedule'
		| 'defaultSchedules'
		| 'scheduleOverrides'
		| 'shortLink' {
		if (announcementBoardEditLogs.find((a) => a.id === genericLog.id)) return 'announcement';
		if (bulletinBoardEditLogs.find((a) => a.id === genericLog.id)) return 'bulletin';
		if (clubEditLogs.find((a) => a.id === genericLog.id)) return 'clubs';
		if (contactEditLogs.find((a) => a.id === genericLog.id)) return 'contacts';
		if (linkEditLogs.find((a) => a.id === genericLog.id)) return 'links';
		if (scheduleEditLogs.find((a) => a.id === genericLog.id)) return 'schedule';
		if (defaultScheduleEditLogs.find((a) => a.id === genericLog.id)) return 'defaultSchedules';
		if (scheduleOverrideEditLogs.find((a) => a.id === genericLog.id)) return 'scheduleOverrides';
		if (shortLinkEditLogs.find((a) => a.id === genericLog.id)) return 'shortLink';
		throw Error('No matching typed edit log could be found');
	}
	function locateEditLog<T>(
		editLogs: { editLog: IEditLog<T>; id: number }[],
		id: number
	): IEditLog<T> {
		const editLog = editLogs.find((a) => a.id === id);
		if (editLog === undefined) throw new Error('Could not locate edit log');
		return editLog.editLog;
	}
</script>

{#snippet table(
	genericLogs: {
		editLog: IEditLogBase;
		id: number;
	}[]
)}
	<Table striped shadow>
		<TableHead>
			<TableHeadCell>Operation</TableHeadCell>
			<TableHeadCell>Edited By</TableHeadCell>
			<TableHeadCell>Edited On</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each genericLogs as genericLog}
				{@const operation = genericLog.editLog.operation}
				{@const editedBy = genericLog.editLog.editedBy}
				{@const editedOn = genericLog.editLog.createdAt}
				{@const type = dataType(genericLog)}
				{#if type === 'announcement'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render announcementEdit(locateEditLog(announcementBoardEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'bulletin'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render bulletinEdit(locateEditLog(bulletinBoardEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'clubs'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render clubEdit(locateEditLog(clubEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'contacts'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render contactEdit(locateEditLog(contactEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'links'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render linkEdit(locateEditLog(linkEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'schedule'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render scheduleEdit(locateEditLog(announcementBoardEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'defaultSchedules'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render defaultScheduleEdit(locateEditLog(announcementBoardEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'scheduleOverrides'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render scheduleOverrideEdit(locateEditLog(announcementBoardEditLogs, genericLog.id))}
					</Edit>
				{/if}
				{#if type === 'shortLink'}
					<Edit {operation} {editedBy} {editedOn}>
						{@render shortLinkEdit(locateEditLog(announcementBoardEditLogs, genericLog.id))}
					</Edit>
				{/if}
			{/each}
		</TableBody>
	</Table>
{/snippet}

{#snippet announcementEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is an announcement</div>
{/snippet}
{#snippet bulletinEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a bulletin</div>
{/snippet}
{#snippet clubEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a club</div>
{/snippet}
{#snippet contactEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a contact</div>
{/snippet}
{#snippet linkEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a link</div>
{/snippet}
{#snippet scheduleEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a schedule</div>
{/snippet}
{#snippet defaultScheduleEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a default schedule</div>
{/snippet}
{#snippet scheduleOverrideEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a schedule override</div>
{/snippet}
{#snippet shortLinkEdit(editLog: IEditLog<IAnnouncement>)}
	<div>This is a short link</div>
{/snippet}

<Tabs>
	<TabItem open title="All">
		{@render table(allItems)}
	</TabItem>
</Tabs>
