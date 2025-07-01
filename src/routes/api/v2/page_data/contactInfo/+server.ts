import { ContactInfoLinkCard } from '$lib/models/crud/linkCardModel';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ }) => {
    const docs = await ContactInfoLinkCard.find().sort({ order: "asc" }).exec();

    return json({
        cards: docs.map((doc) => doc.toObject())
    });
};