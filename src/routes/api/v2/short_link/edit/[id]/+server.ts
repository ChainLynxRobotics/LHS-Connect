import { shortLinkAdminUpdateValidator } from '$api/short_link/validator';
import { Permission } from '$lib/auth/permissions';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ShortLink } from '$api/short_link/model';
import { ValidationError } from 'yup';
import { idValidator } from '$lib/validation/objectId';

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.permissions.has(Permission.MANAGE_SHORT_LINKS))
		error(403, 'You do not have permission to manage short links.');

	try {
		const id = idValidator.validateSync(params['id']);

		// Get and validate body
		const req = await request.json();
		const validatedReq = await shortLinkAdminUpdateValidator.validate(req, { stripUnknown: true });

		// Find and update doc in db
		const doc = await ShortLink.findById(id).exec();
		if (doc === null) return error(404, { message: 'Not found' });
		doc.set(validatedReq);
		await doc.save();

		return json({
			result: doc.toObject(),
		});
	} catch (e) {
		if (e instanceof ValidationError) return error(400, { message: e.message });
		else throw e;
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.permissions.has(Permission.MANAGE_SHORT_LINKS))
		error(403, 'You do not have permission to manage short links.');

	try {
		const id = idValidator.validateSync(params['id']);

		// Find and delete doc in db
		const doc = await ShortLink.findById(id).exec();
		if (doc === null) return error(404, { message: 'Not found' });
		await doc.deleteOne().exec();

		return json({});
	} catch (e) {
		if (e instanceof ValidationError) return error(400, { message: e.message });
		else throw e;
	}
};
