import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ValidationError } from 'yup';
import { fileTransferCodeValidator } from '$api/file_transfer/validator';

export const load = (async ({ url, fetch }) => {
	try {
		const code = await fileTransferCodeValidator.validate(url.searchParams.get('code'));

		const fileData = await fetch(`/api/v2/file_transfer/${code}/files`);

		return {
			code,
			uploadedFiles: (await fileData.json()).results || [],
		};
	} catch (e) {
		if (e instanceof ValidationError) {
			return error(400, { message: e.message });
		} else throw e;
	}
}) satisfies PageLoad;
