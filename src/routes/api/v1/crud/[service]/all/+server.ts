import { array, ValidationError } from "yup";
import { _getAllDocs } from "../+server";
import { getServiceData } from "../../globalCrud";
import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";
import { Permission } from "$lib/auth/permissions";

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.permissions.has(Permission.VIEW)) error(403, "You do not have permission to view this resource.");
    const { model, validator, canReorder, singleton } = getServiceData(params.service);
        
    // Return all docs
    return _getAllDocs(model, canReorder);
}

export const POST: RequestHandler = async ({ locals, params, request }) => {
    if (!locals.permissions.has(Permission.EDIT)) error(403, "You do not have permission to edit this resource.");
    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    
    if (singleton) return error(405, { message: "Method not allowed" });

    try {
        const req = await request.json();
        let validatedReq = await array().of(validator).validate(req, { stripUnknown: true });

        await model.deleteMany().exec();
        if (canReorder) validatedReq = validatedReq!.map((doc, i) => ({ ...doc, order: i }));
        await model.insertMany(validatedReq);

        return _getAllDocs(model, canReorder);
    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
}