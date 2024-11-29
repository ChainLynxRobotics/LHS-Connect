import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
import type { IBellScheduleDefaults } from '$lib/types/crud/bellScheduleDefaults';
import type { IBellScheduleOverride } from '$lib/types/crud/bellScheduleOverride';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const res = await event.fetch('/api/v1/crud/bellScheduleOverrides');
	const json = await res.json();

	const res2 = await event.fetch('/api/v1/crud/bellScheduleDefaults');
	const json2 = await res2.json();

	const res3 = await event.fetch('/api/v1/crud/bellSchedules');
	const json3 = await res3.json();
	return {
		specials: json.results as IBellScheduleOverride[],
		defaults: json2.results as IBellScheduleDefaults[],
		schedules: json3.results as IBellSchedule[],
	};
}) satisfies PageLoad;
