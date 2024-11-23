import { idValidation } from '$lib/validation/crud/globalCrudSchema';
import { ValidationError } from 'yup';
import type { RequestHandler, RouteParams } from './$types';
import { error, json } from '@sveltejs/kit';
import { getServiceData } from '../../globalCrud';
import { _getAllDocs } from '../+server';

export const GET: RequestHandler = async ({ params }) => {
    
    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    const id = getId(params);

    if (singleton) return error(405, { message: "Method not allowed" });

    // Find doc
    const doc = await model.findById(id).exec();
    if (doc === null) return error(404, { message: "Not found" });
    
    return json({
        result: doc.toObject()
    })
}

export const PATCH: RequestHandler = async ({ params, request }) => {
    // TODO: Auth

    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    const id = getId(params);

    if (singleton) return error(405, { message: "Method not allowed" });

    try {

        // Get and validate body
        const req = await request.json();
        const validatedReq = await validator.validate(req, { stripUnknown: true });

        // Find and update doc in db
        const doc = await model.findById(id).exec();
        if (doc === null) return error(404, { message: "Not found" });
        doc.set(validatedReq);
        await doc.save();

        return json({
            result: doc.toObject()
        })
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
}

export const DELETE: RequestHandler = async ({ params }) => {
    // TODO: Auth

    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    const id = getId(params);

    if (singleton) return error(405, { message: "Method not allowed" });

    // Find doc
    const doc = await model.findByIdAndDelete(id).exec();
    if (doc === null) return error(404, { message: "Not found" });

    return _getAllDocs(model, canReorder);
}

function getId(params: RouteParams) {
    try {
        return idValidation.validateSync(params['id']);
    } catch (e) {
        if (e instanceof ValidationError) return error(400, { message: e.message });
        else throw e;
    }
}