import { ShortLink } from "$lib/models/shortLinkModel";
import { number, string, ValidationError } from "yup";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import { Permission } from "$lib/auth/permissions";
import { User } from "$lib/models/userModel";

const pageValidator = number().min(1).default(1).label("page");
const pageSizeValidator = number().min(5).max(100).default(50).label("pageSize");
const searchValidator = string().trim().max(512).label("search");
const orderByValidator = string().oneOf(["name", "email", "permissions", "firstLogin", "lastLogin"]).default("permissions").label("orderBy");
const orderValidator = string().oneOf(["asc", "desc"]).default("desc").label("order");

export const GET: RequestHandler = async ({ locals, url }) => {
    if (!locals.permissions.has(Permission.MANAGE_USERS)) error(403, "You do not have permission to manage users.");
    try {
        const page = await pageValidator.validate(url.searchParams.get("page"));
        const pageSize = await pageSizeValidator.validate(url.searchParams.get("pageSize"));
        const search = await searchValidator.validate(url.searchParams.get("search"));
        const orderBy = await orderByValidator.validate(url.searchParams.get("orderBy"));
        const order = await orderValidator.validate(url.searchParams.get("order"));
        
        const totalCount = await User.countDocuments().exec();
        const userQuery = User.find().sort({ [orderBy]: order }).select("+firstLogin +lastLogin");
        if (search) userQuery.find({ $text: { $search: search } });
        const users = await userQuery.skip((page - 1) * pageSize).limit(pageSize).exec();

        return json({
            total: totalCount || 0,
            page: page,
            pageSize: pageSize,
            results: users.map((link) => ({
                ...link.toObject(),
                hash: undefined
            })),
        });
    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
};