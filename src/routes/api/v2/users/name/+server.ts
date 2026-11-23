import { Permission } from '$lib/auth/permissions';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ValidationError } from 'yup';
import { User } from '../model';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.permissions.has(Permission.VIEW))
		error(403, 'You do not have permission to manage users.');
	try {
		const googleId = url.searchParams.get('googleId');

		const name = await User.findById(id, 'name').exec();
		return json({ name: name });
	} catch (e) {
		if (e instanceof ValidationError) error(400, e.message);
		else throw e;
	}
};
