import { fileTransferCodeValidator } from '$lib/validation/fileTransferValidator';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFileBucket } from '$lib/db/mongodb';
import type { CloudFile } from '$lib/types/FileTransferData';
import { ValidationError } from 'yup';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const code = await fileTransferCodeValidator.validate(params.code);

        const bucket = await getFileBucket();
        const files = await bucket.find({ 'metadata.code': code }).limit(100).toArray();
        
        const results: CloudFile[] = files.map(file => ({
            id: file._id.toHexString(),
            name: file.filename,
            size: file.length,
            uploadedAt: file.uploadDate.getTime(),
        }));

        return json({ results });
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};

export const POST: RequestHandler = async ({ url, params, request }) => {
    try {
        const code = await fileTransferCodeValidator.validate(params.code);

        const fileName = url.searchParams.get('name') || 'unnamed';

        if (parseInt(request.headers.get('content-length')||'0') > 100 * 1024 * 1024) return error(400, { message: 'File size limit is 100MB' });

        const bucket = await getFileBucket();

        // Check if the global file size limit has been reached
        const existing = await bucket.find().toArray();
        const totalSize = existing.reduce((acc, file) => acc + file.length, 0);
        if (totalSize > 5 * 1024 * 1024 * 1024) return error(400, { message: 'Global file size limit reached, come back later' }); // 5GB

        // Start uploading the file
        const uploadStream = bucket.openUploadStream(fileName, { metadata: { code } });
        
        if (!request.body) return error(400, { message: 'Invalid body' }); // This happens when the sveltekit body size limit is reached and sveltekit refuses to handle it
        const reader = request.body.getReader();
        let res: ReadableStreamReadResult<Uint8Array>;
        while (!(res = await reader.read()).done) {
            uploadStream.write(res.value);
        }
        await new Promise((resolve)=>uploadStream.end(resolve));

        return json({});
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};