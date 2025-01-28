import { fileTransferCodeValidator } from '$lib/validation/fileTransferValidator';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    let code = Math.floor(Math.random() * 10000).toString().padStart(4, '0') + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    if (cookies.get('fileTransferCode')) {
        let cookieCode = cookies.get('fileTransferCode');
        if (await fileTransferCodeValidator.isValid(cookieCode) && cookieCode) {
            code = cookieCode;
        }
    }
    cookies.set('fileTransferCode', code, { path: '/', maxAge: 1800 }); // 30min
    
    return redirect(301, '/file-transfer/'+code);
}) satisfies PageServerLoad;