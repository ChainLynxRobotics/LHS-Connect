import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ShortLink } from '$api/short_link/model';
import { shortLinkSuffixValidator } from '$api/short_link/validator';

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
