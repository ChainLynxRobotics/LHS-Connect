import { BellSchedule } from "$lib/models/crud/bellScheduleModel";
import type { WithoutID } from "$lib/types/crud/globalCrud";
import { idValidation } from "$lib/validation/crud/globalCrudSchema";
import { json, type RequestHandler } from "@sveltejs/kit";
import type { Model } from "mongoose";
import { ValidationError, type ObjectSchema } from "yup";

export function getCrudHandlersAtIndex<T>(Model: Model<T>, validator: ObjectSchema<WithoutID<T>>) {

    const GET: RequestHandler = async () => {
        
        const docs = await Model.find().exec();
        
        return json({
            success: true,
            results: docs.map(doc=>doc.toObject())
        })
    }

    const POST: RequestHandler = async ({ request }) => {
        // TODO: Auth
        
        try {
            // Get and validate body
            const req = await request.json();
            const validatedReq = await validator.validate(req, { stripUnknown: true });

            // Create doc
            const doc = new Model(validatedReq);
            const res = await doc.save();

            return json({
                success: true,
                result: res.toObject()
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                return json({
                    success: false,
                    error: error.message
                }, { status: 400 });
            }
            else throw error;
        }
    }

    return {
        GET,
        POST
    }
}

export function getCrudHandlersAtSlug<T>(Model: Model<T>, validator: ObjectSchema<WithoutID<T>>) {

    const GET: RequestHandler = async ({ params }) => {
        // Get and validate id slug
        const id = params['id'];
        if (!idValidation.isValidSync(id)) return json({ success: false, error: "Invalid id" });

        // Find doc
        const doc = await Model.findById(id).exec();
        if (doc === null) return json({ success: false, error: "Not found" }, { status: 404 });
        
        return json({
            success: true,
            result: doc.toObject()
        })
    }

    const PATCH: RequestHandler = async ({ params, request }) => {
        // TODO: Auth

        try {
            // Get and validate id slug
            const id = params['id'];
            if (!idValidation.isValidSync(id)) return json({ success: false, error: "Invalid id" });

            // Get and validate body
            const req = await request.json();
            const validatedReq = await validator.validate(req, { stripUnknown: true });

            // Find and update doc in db
            const doc = await Model.findByIdAndUpdate(id, validatedReq).exec();
            if (doc === null) return json({ success: false, error: "Not found" }, { status: 404 });

            return json({
                success: true,
                result: doc.toObject()
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                return json({
                    success: false,
                    error: error.message
                }, { status: 400 });
            }
            else throw error;
        }
    }

    const DELETE: RequestHandler = async ({ params }) => {
        // TODO: Auth

        // Get and validate id slug
        const id = params['id'];
        if (!idValidation.isValidSync(id)) return json({ success: false, error: "Invalid id" });

        // Find doc
        const doc = await Model.findByIdAndDelete(id).exec();
        if (doc === null) return json({ success: false, error: "Not found" }, { status: 404 });

        return json({
            success: true
        });
    }

    return {
        GET,
        PATCH,
        DELETE
    }
}