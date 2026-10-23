import type { RequestHandler } from './$types';
import { BulletinBoardNote } from './model';

export const GET: RequestHandler = async ({}) => {
	const docs = await BulletinBoardNote.find().sort({ order: 'asc' }).exec();

	return Response.json({
		notes: docs.map((doc) => doc.toObject()),
	});
};
