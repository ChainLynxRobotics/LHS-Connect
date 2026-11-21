import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BellScheduleOverrideEdit } from '../../scheduleOverrideModel';
import { Permission } from '$lib/auth/permissions';
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.permissions.has(Permission.EDIT))
		error(403, 'You do not have permission to view this resource.');

	const docs = await BellScheduleOverrideEdit.find().sort({ createdAt: -1 }).exec();

	return json({ records: docs.map((doc) => doc.toObject()) });
};
