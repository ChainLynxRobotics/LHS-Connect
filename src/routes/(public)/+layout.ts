import type { LayoutLoad } from './$types';
export const load = (async ({ url, data }) => {
    return {
        ...data,
        pathname: url.pathname,
    };
}) satisfies LayoutLoad;