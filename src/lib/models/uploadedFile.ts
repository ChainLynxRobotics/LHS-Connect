import type { IUploadedFile } from "$lib/types/uploadedFile";
import mongoose, { Model } from "mongoose";

const uploadedFileSchema = new mongoose.Schema<IUploadedFile>({
    key: { type: String, required: true, unique: true, maxlength: 512 },
    name: { type: String, required: true, maxlength: 256 },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
    code: { type: String, required: true, maxlength: 9 },
    url: { type: String, required: true, maxlength: 512 },
});

export const UploadedFile: Model<IUploadedFile> = mongoose.models.UploadedFile ?? mongoose.model("UploadedFile", uploadedFileSchema);