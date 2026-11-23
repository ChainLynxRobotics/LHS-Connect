import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ShortLinkEdit } from '../shortLinkModel';
import { Permission } from '$lib/auth/permissions';
export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.permissions.has(Permission.EDIT))
        error(403, 'You do not have permission to view this resource.');
    const docs = await ShortLinkEdit.find().sort({ createdAt: -1 }).exec();

    return json({ results: docs.map((doc) => doc.toObject()) });
};
