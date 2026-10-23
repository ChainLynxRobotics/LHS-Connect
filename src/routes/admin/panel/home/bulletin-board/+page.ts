import type { IBulletinBoardNote } from '#api/page_data/bulletinBoard/types.js';
import type { GetAllResults } from '#lib/util/adminApiClient.js';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const bulletinBoardNotes = (await (
		await event.fetch('/api/v2/page_data/bulletinBoard/edit')
	).json()) as GetAllResults<IBulletinBoardNote>;

	return {
		bulletinBoardNotes: bulletinBoardNotes.results,
	};
}) satisfies PageLoad;
