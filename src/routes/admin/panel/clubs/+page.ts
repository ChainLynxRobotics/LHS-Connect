import type { PageLoad } from './$types';
import type { IClub } from '$lib/types/crud/club';

export const load = (async (event) => {
	const res = await event.fetch('/api/v1/crud/clubs');
	const json = await res.json();
	return {
		results: json.results as IClub[],
	};
}) satisfies PageLoad;
