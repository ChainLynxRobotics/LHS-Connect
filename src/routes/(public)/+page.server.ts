import type { HomePageData } from '$lib/types/HomePageData';
import type { PageServerLoad } from './$types';

// TODO: Replace this with actual data loading.
import bellSchedules from '$lib/fake_data/bellSchedules';
import bulletinBoard from '$lib/fake_data/bulletinBoard';
import contactInfo from '$lib/fake_data/contactInfo';
import usefulLinks from '$lib/fake_data/usefulLinks';

export const load = (async (): Promise<HomePageData> => {
	// This is a mock of the data that would be loaded from a database.
	return {
		bellSchedules: bellSchedules,
		bulletinBoard: bulletinBoard,
		contactInfo: contactInfo,
		usefulLinks: usefulLinks
	};
}) satisfies PageServerLoad;
