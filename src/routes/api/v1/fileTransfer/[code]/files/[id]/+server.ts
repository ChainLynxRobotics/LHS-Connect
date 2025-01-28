import { getFileBucket } from '$lib/db/mongodb';
import { idValidator } from '$lib/validation/crud/globalCrudValidator';
import { fileTransferCodeValidator } from '$lib/validation/fileTransferValidator';
import mongoose from 'mongoose';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { ValidationError } from 'yup';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const code = await fileTransferCodeValidator.validate(params.code);
        const fileId = await idValidator.validate(params.id);

        const bucket = await getFileBucket();
        const file = (await bucket.find({ _id: new mongoose.mongo.ObjectId(fileId), 'metadata.code': code }).toArray())[0] || undefined;
        if (!file) return error(404, { message: 'File not found' });

        const stream = bucket.openDownloadStream(new mongoose.mongo.ObjectId(fileId));

        // Stream weirdness to make the GridFSBucketReadStream into a ReadableStream for SvelteKit to be happy
        const readableStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => controller.enqueue(chunk));
                stream.on('end', () => controller.close());
                stream.on('error', (err) => controller.error(err));
            },
            cancel() {
                stream.destroy();
            }
        });

        return new Response(readableStream, {
            headers: {
                'Content-Disposition': `attachment; filename="${encodeURIComponent(file.filename)}"`,
                'Content-Type': 'application/octet-stream',
            },
        });
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};