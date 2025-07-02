import type { IAnnouncement } from '$api/page_data/announcement/types';
import type { GetAllResults } from '$lib/util/adminApiClient';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const announcement = (await (
		await fetch('/api/v2/page_data/announcement/edit')
	).json()) as GetAllResults<IAnnouncement>;
	return {
		announcement: announcement.results[0],
	};
}) satisfies PageLoad;
