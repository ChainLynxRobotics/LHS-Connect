import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ShortLink } from '$api/shortLink/model';
import { shortLinkSuffixValidator } from '$api/shortLink/validator';

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