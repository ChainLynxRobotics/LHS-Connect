import { json, error } from '@sveltejs/kit';
import { getServiceData } from '../globalCrud';
import type { RequestHandler } from './$types';
import { ValidationError } from 'yup';
import type { Model } from 'mongoose';

export const GET: RequestHandler = async ({ params }) => {
    const { model, validator, canReorder, singleton } = getServiceData(params.service);
        
    // Return all docs
    return _getAllDocs(model, canReorder);
}

export const POST: RequestHandler = async ({ params, request }) => {
    // TODO: Auth

    const { model, validator, canReorder, singleton } = getServiceData(params.service);
    
    try {
        // Get and validate body
        const req = await request.json();
        const validatedReq = await validator.validate(req, { stripUnknown: true });

        if (singleton) {
            const docs = await model.find().exec();
            if (docs.length > 0) {
                docs[0].set(validatedReq).save();
                for (let doc of docs.slice(1)) await doc.deleteOne().exec(); // Delete all other docs in case there are more than one
                return json({ result: docs[0].toObject() });
            }
            // Else, continue to create the doc
        }

        // Create doc
        const doc = new model(validatedReq);
        if (canReorder) {
            // Find the highest order value and set the new doc's order to one higher
            const highestOrderDoc = await model.findOne().sort({ order: "desc" }).exec();
            doc.set('order', highestOrderDoc ? highestOrderDoc.get('order') + 1 : 0);
        }
        const res = await doc.save();

        // Return all docs
        return _getAllDocs(model, canReorder);
    } catch (e) {
        if (e instanceof ValidationError) error(400, e.message);
        else throw e;
    }
}

export async function _getAllDocs(model: Model<any>, canReorder: boolean = false) {
    const query = model.find();
    if (canReorder) query.sort({ order: "asc" });
    const docs = await query.exec();
    return json({
        results: docs.map(doc=>doc.toObject()),
        order: canReorder ? docs.map(doc=>doc.id) : undefined
    })
}