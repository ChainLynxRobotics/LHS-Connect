import { ObjectSchema, string } from 'yup';
import urlRegex from '../url';
import { crudListValidation } from './globalCrudSchema';
import type { IBulletinBoardNote } from '$lib/types/crud/bulletinBoard';

export const bulletinBoardNoteValidation: ObjectSchema<IBulletinBoardNote> = crudListValidation.shape({
	title: string().required().min(1).max(64),
	content: string().required().min(1).max(512),
	link: string().optional().matches(urlRegex, 'must be a valid url').max(1024)
});
