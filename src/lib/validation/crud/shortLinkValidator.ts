import { object, ObjectSchema, string } from 'yup';
import type { IShortLinkBare, IShortLinkCreate } from '$lib/types/crud/shortLink';

export const shortLinkBareValidator: ObjectSchema<IShortLinkBare> = object({
	url: string().trim().required().url().max(2048).label('URL'),
	suffix: string()
		.trim()
		.required()
		.matches(/^[a-zA-Z0-9-]{1,32}$/, 'Suffix must only contain letters, numbers, and dashes')
		.label('Suffix'),
});

export default shortLinkBareValidator.shape({
	password: string().optional().label('Password')
}) as ObjectSchema<IShortLinkCreate>;
