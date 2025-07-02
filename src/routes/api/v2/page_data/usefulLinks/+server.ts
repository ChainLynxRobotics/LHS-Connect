import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { UsefulLinksLinkCard } from './model';

export const GET: RequestHandler = async ({}) => {
	const docs = await UsefulLinksLinkCard.find().sort({ order: 'asc' }).exec();

	return json({
		cards: docs.map((doc) => doc.toObject()),
	});
};
