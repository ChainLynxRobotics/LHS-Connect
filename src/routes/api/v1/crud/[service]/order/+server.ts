import { error, json } from '@sveltejs/kit';
import { getServiceData } from '../../globalCrud';
import type { RequestHandler } from './$types';
import { ValidationError } from 'yup';
import { Permission } from '$lib/auth/permissions';
import { idArrayValidator } from '$lib/validation/crud/globalCrudValidator';

export const GET: RequestHandler = async ({ locals, params }) => {
    if (!locals.permissions.has(Permission.VIEW)) error(403, "You do not have permission to view this resource.");
    
    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    if (!canReorder) return error(405, { message: "Method not allowed" });

    const docs = await model.find().sort({ order: "asc" }).select('_id').exec();
    return json({
        order: docs.map(doc=>doc.id)
    });
}

export const POST: RequestHandler = async ({ locals, params, request }) => {
    if (!locals.permissions.has(Permission.EDIT)) error(403, "You do not have permission to edit this resource.");

    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    if (!canReorder) return error(405, { message: "Method not allowed" });

    try {
        // Get and validate body
        const req = await request.json();
        let order = await idArrayValidator.validate(req, { stripUnknown: true });
        if (!order) return error(400, { message: "Invalid IDs" });

        // Get all IDs for order checking
        const allIds = (await model.find().select('_id').exec()).map(doc=>doc.id);
        order = order.filter(id=>allIds.includes(id));
        if (order.length !== allIds.length || !allIds.every(id=>order.includes(id))) return error(400, { message: "Invalid IDs" });

        // Update order
        const promises = [];
        for (let i = 0; i < order.length; i++) {
            promises.push(model.findByIdAndUpdate(order[i], { order: i }).exec());
        }
        await Promise.all(promises);

        return json({
            order
        });

    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
}