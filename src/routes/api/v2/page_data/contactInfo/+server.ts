import type { RequestHandler } from './$types';
import { ContactInfoLinkCard } from './model';

export const GET: RequestHandler = async ({}) => {
	const docs = await ContactInfoLinkCard.find().sort({ order: 'asc' }).exec();

	return Response.json({
		cards: docs.map((doc) => doc.toObject()),
	});
};
