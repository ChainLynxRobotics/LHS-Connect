import { array, object, string, type InferType } from 'yup';
import urlRegex from './url';

export const linkCardSchemaLinkName = string().required().max(64).label('Name');
export const linkCardSchemaLinkUrl = string().required().matches(urlRegex, "must be a valid url").max(512).label('URL');

export const linkCardLinkSchema = object({
	name: linkCardSchemaLinkName,
	url: linkCardSchemaLinkUrl
});

const linkCardSchema = object({
	title: string().required().max(64),
	subtitle: string().optional().max(256),
	links: array().of(linkCardLinkSchema).required().min(1).max(16)
});

export default linkCardSchema;

export type LinkCardSchema = InferType<typeof linkCardSchema>;
