import { idValidation } from "$lib/validation/crud/globalCrudSchema";
import { ValidationError } from "yup";
import type { RequestHandler, RouteParams } from "./$types";
import { error, json } from "@sveltejs/kit";
import { shortLinkCreateValidation } from "$lib/validation/crud/shortLinkSchema";
import { ShortLink } from "$lib/models/shortLinkModel";

export const PATCH: RequestHandler = async ({ params, request }) => {

    const id = getId(params);

    // Get and validate body
    const req = await request.json();
    const validatedReq = await shortLinkCreateValidation.validate(req, { stripUnknown: true });

    // Find and update doc in db
    const doc = await ShortLink.findById(id).exec();
    if (doc === null) return error(404, { message: "Not found" });
    doc.set(validatedReq);
    await doc.save();

    return json({
        result: doc.toObject()
    })
};

export const DELETE: RequestHandler = async ({ params }) => {

    const id = getId(params);

    // Find and delete doc in db
    const doc = await ShortLink.findById(id).exec();
    if (doc === null) return error(404, { message: "Not found" });
    await doc.deleteOne().exec();

    return json({})
};

function getId(params: RouteParams) {
    try {
        return idValidation.validateSync(params['id']);
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
}