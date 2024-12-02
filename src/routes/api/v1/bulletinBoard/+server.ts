import { BulletinBoardNote } from "$lib/models/crud/bulletinBoardModel";
import type { BulletinBoardData } from "$lib/types/HomePageData";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ }) => {
    const docs = await BulletinBoardNote.find().sort({ order: "asc" }).exec();

    return json({
        notes: docs.map((doc) => doc.toObject())
    } satisfies BulletinBoardData);
};