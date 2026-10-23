import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	S3_BUCKET_NAME: {},
	DISCORD_WEBHOOK_URL: {},
	PUBLIC_ANALYTICS_URL: { public: true },
	PUBLIC_BASE_URL: { public: true },
	PUBLIC_BASE_SHORT_URL: { public: true },
	MONGO_DB_URI: {},
	S3_ACCESS_KEY_ID: {},
	S3_ENDPOINT: {},
	S3_SECRET_ACCESS_KEY: {},
	GOOGLE_CLIENT_ID: {},
	GOOGLE_CLIENT_SECRET: {},
});
