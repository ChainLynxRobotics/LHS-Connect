import { Permission, Permissions } from '$lib/auth/permissions';
import { idValidator } from '$lib/validation/objectId';
import { error, json } from '@sveltejs/kit';
import { ValidationError } from 'yup';
import { User } from '../../model';
import { userAdminUpdateValidator } from '../../validator';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
	if (!locals.permissions.has(Permission.MANAGE_USERS))
		error(403, 'You do not have permission to manage users.');

	try {
		const id = idValidator.validateSync(params['id']);

		// Get and validate body
		const req = await request.json();
		const validatedReq = await userAdminUpdateValidator.validate(req, { stripUnknown: true });

		const newPermissions = new Permissions(validatedReq.permissions).strip();

		const doc = await User.findById(id).select('+firstLogin +lastLogin').exec(); // select +firstLogin +lastLogin to get these fields when the user is returned
		if (doc === null) error(404, { message: 'Not found' });
		const oldPermissions = new Permissions(doc.permissions).strip();

		if (newPermissions.has(Permission.OWNER) != oldPermissions.has(Permission.OWNER))
			error(400, 'Cannot set owner permission');
		if (
			newPermissions.has(Permission.MANAGE_USERS) != oldPermissions.has(Permission.MANAGE_USERS) &&
			!locals.permissions.has(Permission.OWNER)
		)
			error(403, 'Cannot set manage users permission');

		// update doc in db
		doc.permissions = newPermissions.get();
		await doc.save();

		return json({
			result: doc.toObject(),
		});
	} catch (e) {
		if (e instanceof ValidationError) error(400, { message: e.message });
		else throw e;
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.permissions.has(Permission.MANAGE_USERS))
		error(403, 'You do not have permission to manage users.');

	try {
		const id = idValidator.validateSync(params['id']);

		// Get and validate body
		const doc = await User.findById(id).exec();
		if (doc === null) error(404, { message: 'Not found' });
		const oldPermissions = new Permissions(doc.permissions).strip();

		if (oldPermissions.has(Permission.OWNER)) error(400, 'Cannot delete owner');
		if (oldPermissions.has(Permission.MANAGE_USERS) && !locals.permissions.has(Permission.OWNER))
			error(403, 'Cannot delete user with manage users permission');

		// delete doc in db
		await doc.deleteOne();

		return json({});
	} catch (e) {
		if (e instanceof ValidationError) error(400, { message: e.message });
		else throw e;
	}
};
