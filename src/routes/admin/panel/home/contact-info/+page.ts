import type { ILinkCard } from '#api/page_data/usefulLinks/types.ts';
import type { GetAllResults } from '#lib/util/adminApiClient.ts';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const contactInfo = (await (
		await event.fetch('/api/v2/page_data/contactInfo/edit')
	).json()) as GetAllResults<ILinkCard>;

	return {
		contactInfo: contactInfo.results,
	};
}) satisfies PageLoad;
