import { array, object, ObjectSchema, string } from 'yup';
import type { ILinkCard } from '$lib/types/crud/linkCard';
import type { WithoutID } from '$lib/types/crud/globalCrud';

export const linkCardLinkNameValidator = string().required().max(64).label('Name');
export const linkCardLinkUrlValidator = string().required().max(512).label('URL');

export const linkCardLinkValidator = object({
	title: linkCardLinkNameValidator,
	url: linkCardLinkUrlValidator
});

export default object({
	title: string().required().max(64),
	subtitle: string().optional().max(256),
	links: array().of(linkCardLinkValidator).required().min(1).max(16)
}) as ObjectSchema<WithoutID<ILinkCard>>;
