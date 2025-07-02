import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ContactInfoLinkCard } from './model';

export const GET: RequestHandler = async ({ }) => {
    const docs = await ContactInfoLinkCard.find().sort({ order: "asc" }).exec();

    return json({
        cards: docs.map((doc) => doc.toObject())
    });
};