import type { IBellSchedule, IBellScheduleDefaults, IBellScheduleOverride } from '$api/page_data/bellSchedule/types';
import type { GetAllResults } from '$lib/util/adminApiClient';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const bellSchedules = await (await fetch('/api/v2/page_data/bellSchedules/edit')).json() as GetAllResults<IBellSchedule>;
	const bellScheduleDefaults = await (await fetch('/api/v2/page_data/bellScheduleDefaults/edit')).json() as GetAllResults<IBellScheduleDefaults>;
	const bellScheduleOverrides = await (await fetch('/api/v2/page_data/bellScheduleOverrides/edit')).json() as GetAllResults<IBellScheduleOverride>;

	return {
		bellSchedules: bellSchedules.results,
		bellScheduleDefaults: bellScheduleDefaults.results[0],
		bellScheduleOverrides: bellScheduleOverrides.results,
	};
}) satisfies PageLoad;
