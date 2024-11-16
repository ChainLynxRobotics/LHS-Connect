import { BellSchedule } from '$lib/models/crud/bellScheduleModel';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { bellScheduleValidation } from '$lib/validation/crud/bellScheduleSchema';
import { ValidationError } from 'yup';

export const GET: RequestHandler = async ({ url }) => {

    const id = url.searchParams.get('id');
    
    const query = BellSchedule.find();
    if (id) query.where('_id').equals(id);

    return json(await query.exec());
}

export const POST: RequestHandler = async ({ request }) => {
    
    try {
        const body = request.json();
        const bellSchedule = await bellScheduleValidation.validate(body);
        const test = await BellSchedule.create(bellSchedule);
        return json({ success: true });
    } catch (error) {
        if (error instanceof ValidationError) return json({ success: false, error: error.message }, { status: 400 });
        else return json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}