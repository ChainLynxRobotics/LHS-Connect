import type { IBellSchedule } from '$lib/types/crud/bellSchedule';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const res = await event.fetch('/api/v1/crud/bellSchedules');
	const json = await res.json();
	return {
		results: json.results as IBellSchedule[],
		order: json.order as string[],
	};
}) satisfies PageLoad;
