import type { IBulletinBoardNote } from '$lib/types/crud/bulletinBoard';
import type { BulletinBoardData } from '$lib/types/HomePageData';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const res = await event.fetch('/api/v1/crud/bulletinBoardNotes');
	const json = await res.json();
	return {
		results: json.results as IBulletinBoardNote[],
	};
}) satisfies PageLoad;
