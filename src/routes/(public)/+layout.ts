import type { GlobalPageData } from '$lib/types/GlobalPageData';
import type { LayoutLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const globalData = await fetch('/api/v1/global');

	return {
		...(await globalData.json()) as GlobalPageData,
		pathname: url.pathname
	};
}) satisfies LayoutLoad;
