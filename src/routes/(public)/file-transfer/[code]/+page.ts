import { fileTransferCodeValidator } from '$lib/validation/fileTransferValidator';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ValidationError } from 'yup';

export const load = (async ({ params, fetch }) => {
    try {
        const code = await fileTransferCodeValidator.validate(params.code);

        const fileData = await fetch(`/api/v1/fileTransfer/${code}/files`);

        return {
            code,
            cloudFiles: (await fileData.json()).results || [],
        }
    } catch (e) {
        if (e instanceof ValidationError) {
            return error(400, { message: e.message });
        }
        else throw e;
    }
}) satisfies PageLoad;