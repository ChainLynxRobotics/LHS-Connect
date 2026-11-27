import { Permission } from '$lib/auth/permissions';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import mongoose from 'mongoose';
import { User } from '../model';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.permissions.has(Permission.EDIT))
		error(403, 'You do not have permission to manage users.');

	const docId = url.searchParams.get('docId');

	// If docId is missing or not a valid 24-hex ObjectId, don't query Mongoose
	if (!docId || !mongoose.isValidObjectId(docId)) {
		return json({ result: { name: 'Unknown' } });
	}

	const user = await User.findById(docId, 'name').exec();
	return json({ result: { name: user?.name || 'Unknown' } });
};
