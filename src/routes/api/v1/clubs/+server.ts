import { Club } from '$lib/models/crud/clubModel';
import type { ClubPageData } from '$lib/types/ClubPageData';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ }) => {
    const docs = await Club.find().sort({ name: "asc" }).exec();

    return json({
        clubs: docs.map((doc) => doc.toObject())
    } satisfies ClubPageData);
};