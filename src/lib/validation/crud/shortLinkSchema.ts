import { number, object, ObjectSchema, string } from 'yup';
import { crudValidation } from './globalCrudSchema';
import type { IShortLink, IShortLinkCreate } from '$lib/types/crud/shortLink';

export const shortLinkCreateValidation: ObjectSchema<IShortLinkCreate> = object({
	url: string().trim().required().url().max(2048).label('URL'),
	suffix: string()
		.trim()
		.required()
		.matches(/^[a-zA-Z0-9-]{1,32}$/, 'Suffix must only contain letters, numbers, and dashes')
		.label('Suffix'),
	password: string().optional().label('Password')
});

export const shortLinkValidation: ObjectSchema<IShortLink> = crudValidation
	.concat(shortLinkCreateValidation)
	.shape({
		createdAt: number().required().label('Created At'),
		uses: number().required().label('Uses')
});
