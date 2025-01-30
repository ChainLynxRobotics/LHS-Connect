import type { GlobalPageData } from '$lib/types/GlobalPageData';
import type { LinkCardListData } from '$lib/types/HomePageData';
import type { LayoutLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const usefulLinkData = await fetch('/api/v1/usefulLinks');

	return {
		usefulLinks: await usefulLinkData.json() as LinkCardListData,
		announcement: {text: "Test", updatedAt: new Date().toISOString()},
		pathname: url.pathname
	} satisfies GlobalPageData & Record<string, any>;
}) satisfies LayoutLoad;
