import type { IShortLinkAdminUpdate, IShortLinkCreate, IShortLinkLogin, IShortLinkUrlUpdate } from "$lib/types/crud/shortLink";
import { object, ObjectSchema, string } from "yup";

export const shortLinkUrlValidator = string().trim().required().url().max(2048).label('URL');
export const shortLinkSuffixValidator = string()
    .trim()
    .required()
    .matches(/^[a-zA-Z0-9-]{1,32}$/, 'Suffix must only contain letters, numbers, and dashes')
    .label('Suffix');
export const shortLinkPasswordValidator = string().optional().label('Password');


export const shortLinkCreateValidator = object({
    url: shortLinkUrlValidator,
    suffix: shortLinkSuffixValidator,
    password: shortLinkPasswordValidator,
}) as ObjectSchema<IShortLinkCreate>;

export const shortLinkLoginValidator = object({
    suffix: shortLinkSuffixValidator,
    password: shortLinkPasswordValidator,
}) as ObjectSchema<IShortLinkLogin>;

export const shortLinkUrlUpdateValidator = object({
	url: shortLinkUrlValidator,
}) as ObjectSchema<IShortLinkUrlUpdate>;

export const shortLinkAdminUpdateValidator = object({
	url: shortLinkUrlValidator,
	suffix: shortLinkSuffixValidator,
}) as ObjectSchema<IShortLinkAdminUpdate>;

