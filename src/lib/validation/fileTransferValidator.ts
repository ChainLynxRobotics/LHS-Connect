import { string } from "yup";

export const fileTransferCodeValidator = string()
    .trim()
    .required()
    .matches(/^\d{4}-\d{4}$/, 'Invalid code')
    .label('File Transfer Code');