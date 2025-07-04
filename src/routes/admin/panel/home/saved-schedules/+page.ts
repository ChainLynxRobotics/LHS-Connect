import type { IBellSchedule } from '$api/page_data/bellSchedule/types';
import type { GetAllResults } from '$lib/util/adminApiClient';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const bellSchedules = (await (
		await event.fetch('/api/v2/page_data/bellSchedule/bellSchedules/edit')
	).json()) as GetAllResults<IBellSchedule>;

	return {
		bellSchedules: bellSchedules.results,
	};
}) satisfies PageLoad;
