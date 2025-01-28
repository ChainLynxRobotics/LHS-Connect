import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ }) => {
    let code = Math.floor(Math.random() * 10000).toString().padStart(4, '0') + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    if ('localStorage' in window) {
        let recentCode = localStorage.getItem('fileTransferCode');
        if (recentCode) code = recentCode;
    }
    
        return redirect(301, '/file-transfer/'+code);
}) satisfies PageLoad;