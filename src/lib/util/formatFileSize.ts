/**
 * Formats a file size in bytes to a human-readable string.
 * @param bytes - The file size in bytes.
 * @param decimalPoint - The number of decimal points to include in the result. Default is 2.
 * @returns- The formatted file size, e.g. "1.23 MB".
 */
export default function formatFileSize(bytes: number, decimalPoint?: number): string {
	if (bytes == 0) return '0 Bytes';

	const k = 1024;
	const dm = decimalPoint || 2;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
