import { UsefulLinksLinkCard } from '$lib/models/crud/linkCardModel';
import { Announcement } from '$lib/models/crud/announcementModel';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GlobalPageData } from '$lib/types/GlobalPageData';

export const GET: RequestHandler = async () => {
    const announcement = await Announcement.findOne().exec();
    const docs = await UsefulLinksLinkCard.find().sort({ order: "asc" }).exec();
    
    return json({
        announcement: announcement?.toObject() || {},
        usefulLinks: {
            cards: docs.map((doc) => doc.toObject())
        }
    } as GlobalPageData);
};