import type { IClub } from '$api/page_data/clubs/types';
import type { GetAllResults } from '$lib/util/adminApiClient';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const clubs = await (await event.fetch('/api/v2/page_data/clubs/edit')).json() as GetAllResults<IClub>;
	
	return clubs;
}) satisfies PageLoad;
