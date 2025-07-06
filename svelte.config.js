//import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			edge: false
		}),
		alias: {
			$components: './src/lib/components',
			$assets: './src/lib/assets',
			$styles: './src/lib/styles',
			$api: './src/routes/api/v2',
		},
	},
};

export default config;
