import type { ILinkCard } from '$lib/types/crud/linkCard';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const res = await event.fetch('/api/v1/crud/usefulLinks');
	const json = await res.json();
	return {
		results: json.results as ILinkCard[],
		order: json.order as string[],
	};
}) satisfies PageLoad;
