import { array, object, ObjectSchema, string } from 'yup';
import type { ILinkCard } from '$lib/types/crud/linkCard';
import type { WithoutID } from '$lib/types/crud/globalCrud';

export const linkCardLinkNameValidation = string().required().max(64).label('Name');
export const linkCardLinkUrlValidation = string().required().max(512).label('URL');

export const linkCardLinkValidation = object({
	title: linkCardLinkNameValidation,
	url: linkCardLinkUrlValidation
});

export const linkCardValidation: ObjectSchema<WithoutID<ILinkCard>> = object({
	title: string().required().max(64),
	subtitle: string().optional().max(256),
	links: array().of(linkCardLinkValidation).required().min(1).max(16)
});
