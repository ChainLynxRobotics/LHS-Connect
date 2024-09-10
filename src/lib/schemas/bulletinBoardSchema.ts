import { object, string, type InferType } from 'yup';
import urlRegex from './url';

const bulletinBoardSchema = object({
	title: string().required().min(1).max(64),
	content: string().required().min(1).max(512),
	link: string().optional().matches(urlRegex, "must be a valid url").max(1024)
});

export default bulletinBoardSchema;

export type BulletinBoardSchema = InferType<typeof bulletinBoardSchema>;
