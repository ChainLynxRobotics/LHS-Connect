import { string, object, number } from "yup";

export const fileTransferCodeValidator = string()
    .trim()
    .required()
    .matches(/^\d{4}-\d{4}$/, 'Invalid code')
    .label('File Transfer Code');

export const fileTransferUploadValidator = object({
    name: string().required().max(256).label('File Name'),
    size: number().required().min(1).label('File Size'),
});