import { error, json } from '@sveltejs/kit';
import { number, string, ValidationError } from 'yup';
import { ShortLink } from '../model';
import type { RequestHandler } from './$types';
import { Permission } from '$lib/auth/permissions';

const pageValidator = number().min(1).default(1).label("page");
const pageSizeValidator = number().min(5).max(100).default(50).label("pageSize");
const searchValidator = string().trim().max(512).label("search");
const orderByValidator = string().oneOf(["suffix", "url", "createdAt", "uses"]).default("createdAt").label("orderBy");
const orderValidator = string().oneOf(["asc", "desc"]).default("desc").label("order");

export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.permissions.has(Permission.MANAGE_SHORT_LINKS)) error(403, "You do not have permission to view short links.");
    try {
        const page = await pageValidator.validate(url.searchParams.get("page"));
        const pageSize = await pageSizeValidator.validate(url.searchParams.get("pageSize"));
        const search = await searchValidator.validate(url.searchParams.get("search"));
        const orderBy = await orderByValidator.validate(url.searchParams.get("orderBy"));
        const order = await orderValidator.validate(url.searchParams.get("order"));
        
        const totalCount = await ShortLink.countDocuments(search ? { $text: { $search: search } } : {}).exec();

        const linkQuery = ShortLink.find().sort({ [orderBy]: order }).select("+hash");
        if (search) linkQuery.find({ $text: { $search: search } });
        const links = await linkQuery.skip((page - 1) * pageSize).limit(pageSize).exec();

        return json({
            total: totalCount || 0,
            page: page,
            pageSize: pageSize,
            results: links.map((link) => ({
                ...link.toObject(),
                hash: undefined
            })),
        });
    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
};