import { ShortLink } from '$lib/models/shortLinkModel';
import { shortLinkSuffixValidator } from '$lib/validation/shortLinkValidator';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

    if (!(await shortLinkSuffixValidator.isValid(params.link))) {
        return error(404, 'Not Found');
    }

    const link = await ShortLink.findOne({ suffix: params.link }).select('url uses').exec();
    if (!link) return error(404, 'Not Found');

    link.uses += 1;
    link.save();

    return redirect(301, link.url);

}) satisfies PageServerLoad;