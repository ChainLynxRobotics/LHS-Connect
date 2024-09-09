import type { GlobalPageData } from '$lib/types/GlobalPageData';
import type { LayoutServerLoad } from './$types';

//TODO: Replace this with the data you want to load for the layout
import usefulLinks from '$lib/fake_data/usefulLinks';

export const load = (async (): Promise<GlobalPageData> => {
    return {
        footer: {
            usefulLinks: usefulLinks
        }
    };
}) satisfies LayoutServerLoad;