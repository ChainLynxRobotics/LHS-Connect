import { fileTransferCodeValidator, fileTransferUploadValidator } from '$lib/validation/fileTransferValidator';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ValidationError } from 'yup';
import { UploadedFile } from '$lib/models/uploadedFile';
import { s3client } from '$lib/db/s3';
import { S3_BUCKET_NAME } from '$env/static/private';
import { customAlphabet } from 'nanoid';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12);

export const GET: RequestHandler = async ({ params }) => {
    try {
        const code = await fileTransferCodeValidator.validate(params.code);

        const files = await UploadedFile.find({ code });

        return json({ results: files.map(file => file.toObject()) });
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};

export const POST: RequestHandler = async ({ params, request }) => {
    try {
        const code = await fileTransferCodeValidator.validate(params.code);

        const req = await request.json();
        const file = await fileTransferUploadValidator.validate(req, { stripUnknown: true });

        if (file.size > 100 * 1024 * 1024) { // 100MB
            return error(400, { message: `File ${file.name} exceeds size limit of 100MB` });
        }

        const fileKey = nanoid() + '-' + encodeURIComponent(file.name);

        // Generate signed URLs for upload and download
        const uploadUrl = await getSignedUrl(s3client, new PutObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: fileKey,
            ContentLength: file.size,
        }), {
            expiresIn: 15 * 60, // 15 minutes
        })
        const downloadUrl = await getSignedUrl(s3client, new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: fileKey,
        }), {
            expiresIn: 15 * 60, // 15 minutes
        });

        // Save the file metadata to the database
        const uploadedFile = new UploadedFile({
            code,
            key: fileKey,
            name: file.name,
            size: file.size,
            url: downloadUrl,
        });
        await uploadedFile.save();

        return json({
            uploadUrl
        });
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
};