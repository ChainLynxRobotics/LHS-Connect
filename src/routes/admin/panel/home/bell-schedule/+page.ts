import bellSchedules from '$lib/fake_data/bellSchedules';
import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
import type { IBellScheduleOverride } from '$lib/types/crud/bellScheduleOverride';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const res = await event.fetch('/api/v1/crud/bellScheduleOverrides');
	const json = await res.json();

	const res2 = await event.fetch('/api/v1/crud/bellSchedules');
	const json2 = await res2.json();
	return {
		specials: json.results as IBellScheduleOverride[],
		defaults: bellSchedules.defaults, // TODO: get from API
		schedules: json2.results as IBellSchedule[],
	};
}) satisfies PageLoad;
