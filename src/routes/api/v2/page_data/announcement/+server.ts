import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Announcement } from './model';

export const GET: RequestHandler = async () => {
    const announcement = await Announcement.findOne().exec();
    return json(announcement?.toObject() || {});
};