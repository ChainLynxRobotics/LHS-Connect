import { Announcement } from '$lib/models/crud/announcementModel';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const announcement = await Announcement.findOne().exec();
    return json(announcement?.toObject() || {});
};