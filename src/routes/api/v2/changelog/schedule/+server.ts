import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BellScheduleEdit } from '../scheduleModel';
import { Permission } from '$lib/auth/permissions';
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.permissions.has(Permission.EDIT))
		error(403, 'You do not have permission to view this resource.');

	const schedules = await BellScheduleEdit.find().sort({ createdAt: -1 }).exec();
	return json({ results: schedules.map((doc) => doc.toObject()) });
};
