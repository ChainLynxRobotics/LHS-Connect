
export interface CloudFile {
    name: string;
    size: number;
    uploadedAt: number;
}

export interface LocalFile extends CloudFile {
    /** The file object to upload */
    localFile: File;
    /** From 0 to 1 */
    uploadProgress: number;
}