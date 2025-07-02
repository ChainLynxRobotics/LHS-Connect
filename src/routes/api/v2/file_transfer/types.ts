export interface IUploadedFile {
	id: string; // Unique identifier for the file
	key: string; // S3 key for the file
	name: string; // Name of the file
	size: number; // Size of the file in bytes
	uploadedAt: Date; // Timestamp of when the file was uploaded
	code: string; // Code associated with the file transfer
	url: string; // URL to access the file
}

export interface ILocalFile {
	id: string; // Unique client identifier for the file, not sent to the server
	name: string; // Name of the file
	size: number; // Size of the file in bytes
	uploadUrl: string; // URL to upload the file

	file: File; // The actual file object
	uploadProgress: number; // Progress of the file upload (0-100)
}
