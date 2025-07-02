import { UploadedFile } from '$api/file_transfer/model';
import {
	S3_ACCESS_KEY_ID,
	S3_BUCKET_NAME,
	S3_ENDPOINT,
	S3_SECRET_ACCESS_KEY,
} from '$env/static/private';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const s3client = new S3Client({
	region: 'auto',
	endpoint: S3_ENDPOINT,
	credentials: {
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_SECRET_ACCESS_KEY,
	},
	requestChecksumCalculation: 'WHEN_REQUIRED',
	responseChecksumValidation: 'WHEN_REQUIRED',
});

export function startFileClearInterval() {
	setInterval(async () => {
		const files = await UploadedFile.find({
			uploadedAt: { $lt: new Date(Date.now() - 15 * 60 * 1000) }, // 15 minutes
		});

		for await (const file of files) {
			try {
				// Delete file from S3
				await s3client.send(
					new DeleteObjectCommand({
						Bucket: S3_BUCKET_NAME,
						Key: file.key,
					})
				);

				// Remove file metadata from database
				await UploadedFile.deleteOne({ _id: file._id });
				console.log(`Deleted file ${file.key} and its metadata from the database`);
			} catch (error) {
				console.error(`Failed to delete file ${file.key}:`, error);
			}
		}
	}, 60 * 1000); // Every minute
	console.log('File clear interval started');
}
