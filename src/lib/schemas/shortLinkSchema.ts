import { object, string, type InferType } from 'yup';

const shortLinkSchema = object({
	url: string().trim().required().url().max(2048).label('URL'),
	suffix: string()
		.trim()
		.required()
		.matches(/^[a-zA-Z0-9-]{1,32}$/, 'Suffix must only contain letters, numbers, and dashes')
		.label('Suffix'),
	password: string().optional().label('Password')
});

export default shortLinkSchema;

export type ShortLinkSchema = InferType<typeof shortLinkSchema>;
