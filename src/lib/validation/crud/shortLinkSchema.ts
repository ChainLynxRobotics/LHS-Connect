import { number, object, ObjectSchema, string } from 'yup';
import type { IShortLink, IShortLinkBare, IShortLinkCreate } from '$lib/types/crud/shortLink';
import type { WithoutID } from '$lib/types/crud/globalCrud';

export const shortLinkBareValidation: ObjectSchema<IShortLinkBare> = object({
	url: string().trim().required().url().max(2048).label('URL'),
	suffix: string()
		.trim()
		.required()
		.matches(/^[a-zA-Z0-9-]{1,32}$/, 'Suffix must only contain letters, numbers, and dashes')
		.label('Suffix'),
});

export const shortLinkCreateValidation: ObjectSchema<IShortLinkCreate> = shortLinkBareValidation.shape({
	password: string().optional().label('Password')
});

export const shortLinkValidation: ObjectSchema<WithoutID<IShortLink>> = shortLinkCreateValidation.shape({
		createdAt: number().required().label('Created At'),
		uses: number().required().label('Uses')
});
