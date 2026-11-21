import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { ClubEdit } from '../clubModel';
import { Permission } from '$lib/auth/permissions';
// just gets clubs for now for testing, makes its own change
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.permissions.has(Permission.EDIT))
		error(403, 'You do not have permission to view this resource.');
	const club = String(url.searchParams.get('club') ?? '');
	const query = club === '' ? {} : { 'data.name': club };
	//good example of how to use one of the models:
	/* await ClubEdit.create({
		operation: 'create',
		data: {
			name: 'ur mom',
			dayAndTime: 'fri 3pm',
			location: 'wherever',
			advisor: 'Jesus Christ',
		},
		editedBy: 'USER_ID_HERE',
	}); */

	//  const limit = Math.min(Number(url.searchParams.get('limit')) || 25, 100);
	//  const skip = Number(url.searchParams.get('skip')) || 0;

	const docs = await ClubEdit.find(query).sort({ createdAt: -1 }).exec();

	return json({ records: docs.map((doc) => doc.toObject()) });
};
