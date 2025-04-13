import { object, ObjectSchema, string } from 'yup';
import urlRegex from '../url';
import type { IBulletinBoardNote } from '$lib/types/crud/bulletinBoard';
import type { WithoutID } from '$lib/types/crud/globalCrud';

export default object({
	title: string().required().min(1).max(256),
	content: string().required().min(1).max(2048),
	link: string().optional().test(
		'link',
		'link must be a valid url',
		(value) => !value || urlRegex.test(value)
	).max(1024)
}) as ObjectSchema<WithoutID<IBulletinBoardNote>>;
