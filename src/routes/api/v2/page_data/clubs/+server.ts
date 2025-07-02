import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Club } from './model';

export const GET: RequestHandler = async ({}) => {
	const docs = await Club.find().sort({ name: 'asc' }).exec();

	return json({
		clubs: docs.map((doc) => doc.toObject()),
	});
};
