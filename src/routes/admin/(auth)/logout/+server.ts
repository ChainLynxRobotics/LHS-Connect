import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSessionById, deleteSessionTokenCookie } from '$lib/auth/session';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.session) return redirect(302, '/admin/login');

	await deleteSessionById(locals.session.id);
	deleteSessionTokenCookie(cookies);
	return redirect(302, '/admin/login');
};
