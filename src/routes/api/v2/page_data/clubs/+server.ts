import type { RequestHandler } from './$types';
import { Club } from './model';

export const GET: RequestHandler = async ({}) => {
	const docs = await Club.find().sort({ name: 'asc' }).exec();

	return Response.json({
		clubs: docs.map((doc) => doc.toObject()),
	});
};
