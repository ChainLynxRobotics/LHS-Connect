import { generateCodeVerifier, generateState } from 'arctic';
import type { RequestHandler } from './$types';
import { google } from '#lib/auth/oauth.js';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const redirectUrl = google.createAuthorizationURL(state, codeVerifier, [
		'openid',
		'profile',
		'email',
	]);

	cookies.set('google_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax',
	});
	cookies.set('google_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax',
	});

	// Only allow redirecting to Google's sign-in page (SvelteKit 3 blocks external redirects by default)
	return redirect(302, redirectUrl, { external: ['https://accounts.google.com'] });
};
