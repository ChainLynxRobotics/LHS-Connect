import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ContactEdit } from '../contactsModel';
import { Permission } from '$lib/auth/permissions';
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.permissions.has(Permission.EDIT))
		error(403, 'You do not have permission to view this resource.');

	const docs = await ContactEdit.find().sort({ createdAt: -1 }).exec();

	return json({ records: docs.map((doc) => doc.toObject()) });
};
