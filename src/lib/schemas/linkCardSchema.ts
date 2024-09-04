import { array, object, string, type InferType } from 'yup';

export const linkCardSchemaLinkName = string().required().max(64).label('Name');
export const linkCardSchemaLinkUrl = string().required().url().max(512).label('URL');

export const linkCardLinkSchema = object({
	name: linkCardSchemaLinkName,
	url: linkCardSchemaLinkUrl
});

const linkCardSchema = object({
	title: string().required().max(64),
	subtitle: string().optional().max(256),
	periods: array().of(linkCardLinkSchema).required().min(1).max(16)
});

export default linkCardSchema;

export type LinkCardSchema = InferType<typeof linkCardSchema>;
