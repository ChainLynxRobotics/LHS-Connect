import { ShortLink } from "$lib/models/shortLinkModel";
import { number, ValidationError } from "yup";
import type { RequestHandler } from "./$types";
import type { IShortLink } from "$lib/types/crud/shortLink";
import { Document } from "mongoose";
import { error, json } from "@sveltejs/kit";

const pageValidator = number().min(1).default(1).label("page");
const pageSizeValidator = number().min(5).max(100).default(50).label("pageSize");

export const GET: RequestHandler = async ({ url }) => {
    try {
        const page = await pageValidator.validate(url.searchParams.get("page"));
        const pageSize = await pageSizeValidator.validate(url.searchParams.get("pageSize"));

        // Get the total count and the data in the same query
        const links = await ShortLink.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    metadata: [{ $count: 'totalCount' }],
                    data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
                },
            },
        ]);

        return json({
            total: links[0].metadata[0]?.totalCount || 0,
            page: page,
            pageSize: pageSize,
            results: links[0].data.map((link: Document<IShortLink>) => link.toObject()),
        });
    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
};