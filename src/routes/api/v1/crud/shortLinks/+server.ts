import { ShortLink } from "$lib/models/shortLinkModel";
import { number, ValidationError } from "yup";
import type { RequestHandler } from "./$types";
import type { IShortLink } from "$lib/types/crud/shortLink";
import { Document } from "mongoose";
import { error, json } from "@sveltejs/kit";

const pageValidator = number().min(1).default(1).label("page");
const pageSizeValidator = number().min(5).max(100).default(50).label("pageSize");

export const GET: RequestHandler = async ({ url }) => {
    // for (let i = 0; i < 50; i++) {
    //     await ShortLink.create({
    //         suffix: "test-" + Math.random().toString(36).substring(7),
    //         url: "https://example.com/" + i,
    //         createdAt: Date.now(),
    //     });
    // }
    try {
        const page = await pageValidator.validate(url.searchParams.get("page"));
        const pageSize = await pageSizeValidator.validate(url.searchParams.get("pageSize"));

        // Get the total count and the data in the same query
        const totalCount = await ShortLink.countDocuments().exec();
        const links = await ShortLink.find().sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec();

        return json({
            total: totalCount || 0,
            page: page,
            pageSize: pageSize,
            results: links.map((link) => link.toObject()),
        });
    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
};