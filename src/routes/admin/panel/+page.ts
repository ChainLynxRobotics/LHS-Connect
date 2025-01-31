import type { IAnnouncement } from '$lib/types/crud/announcement';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const announcement = await fetch('/api/v1/crud/announcement');
    return {
        announcement: (await announcement.json()).results[0] as IAnnouncement|undefined
    };
}) satisfies PageLoad;