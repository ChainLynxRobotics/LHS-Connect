import type { ILinkCard } from '$api/page_data/usefulLinks/types';
import type { GetAllResults } from '$lib/util/adminApiClient';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const usefulLinks = (await (
		await event.fetch('/api/v2/page_data/usefulLinks/edit')
	).json()) as GetAllResults<ILinkCard>;

	return {
		usefulLinks: usefulLinks.results,
	};
}) satisfies PageLoad;
