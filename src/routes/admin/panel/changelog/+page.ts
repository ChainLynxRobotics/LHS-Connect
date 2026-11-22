import type { IEditLog } from '$api/changelog/types';
import type { IBellSchedule, IBellScheduleDefaults } from '$api/page_data/bellSchedule/types';
import type { IBulletinBoardNote } from '$api/page_data/bulletinBoard/types';
import type { IClub } from '$api/page_data/clubs/types';
import type { ILinkCard } from '$api/page_data/usefulLinks/types';
import type { GetAllResults } from '$lib/util/adminApiClient';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const bulletin = (await (
		await event.fetch('/api/v2/changelog/bulletin')
	).json()) as GetAllResults<IEditLog<IBulletinBoardNote>>;
	const clubs = (await (await event.fetch('/api/v2/changelog/clubs')).json()) as GetAllResults<
		IEditLog<IClub>
	>;
	const contacts = (await (
		await event.fetch('/api/v2/changelog/contacts')
	).json()) as GetAllResults<IEditLog<ILinkCard>>;
	const links = (await (await event.fetch('/api/v2/changelog/links')).json()) as GetAllResults<
		IEditLog<ILinkCard>
	>;
	const schedules = (await (
		await event.fetch('/api/v2/changelog/schedule')
	).json()) as GetAllResults<IEditLog<IBellSchedule>>;
	const defaultSchedules = (await (
		await event.fetch('/api/v2/changelog/schedule/defaults')
	).json()) as GetAllResults<IEditLog<IBellScheduleDefaults>>;
	const scheduleOverrides = (await (
		await event.fetch('/api/v2/changelog/schedule/overrides')
	).json()) as GetAllResults<IEditLog<IClub>>;

	return {
		bulletin,
		clubs,
		contacts,
		links,
		schedules,
		defaultSchedules,
		overrides: scheduleOverrides,
	};
}) satisfies PageLoad;
