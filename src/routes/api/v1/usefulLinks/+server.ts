import { UsefulLinksLinkCard } from "$lib/models/crud/linkCardModel";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { LinkCardListData } from "$lib/types/HomePageData";

export const GET: RequestHandler = async ({ }) => {
    const docs = await UsefulLinksLinkCard.find().sort({ order: "asc" }).exec();

    return json({
        cards: docs.map((doc) => doc.toObject())
    } as LinkCardListData);
};