import type { IAnnouncement } from '$api/page_data/announcement/types';
import type { LinkCardListData } from '$api/page_data/usefulLinks/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const announcement = await (await fetch('/api/v2/page_data/announcement')).json() as IAnnouncement;
	const usefulLinks = await (await fetch('/api/v2/page_data/usefulLinks')).json() as LinkCardListData;

	return {
		announcement,
		usefulLinks,
		pathname: url.pathname
	};
}) satisfies LayoutLoad;
