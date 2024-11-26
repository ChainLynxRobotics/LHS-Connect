import { ShortLink } from "$lib/models/shortLinkModel";
import { number, string, ValidationError } from "yup";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

const pageValidator = number().min(1).default(1).label("page");
const pageSizeValidator = number().min(5).max(100).default(50).label("pageSize");
const searchValidator = string().trim().max(512).label("search");
const orderByValidator = string().oneOf(["suffix", "url", "createdAt", "uses"]).default("createdAt").label("orderBy");
const orderValidator = string().oneOf(["asc", "desc"]).default("desc").label("order");

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
        const search = await searchValidator.validate(url.searchParams.get("search"));
        const orderBy = await orderByValidator.validate(url.searchParams.get("orderBy"));
        const order = await orderValidator.validate(url.searchParams.get("order"));
        
        const totalCount = await ShortLink.countDocuments().exec();
        const linkQuery = ShortLink.find().sort({ [orderBy]: order });
        if (search) linkQuery.find({ $text: { $search: search } });
        const links = await linkQuery.skip((page - 1) * pageSize).limit(pageSize).exec();

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