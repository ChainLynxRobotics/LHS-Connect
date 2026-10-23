import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({ edge: false }),
		}),
	],
	build: {
		rolldownOptions: {
			onLog(level, log, handler) {
				if (level === 'warn') {
					let isAllNodeModules = true;

					if (log.ids && log.ids.length > 0) {
						for (const id of log.ids) {
							if (!id.includes('node_modules')) {
								isAllNodeModules = false;
								break;
							}
						}
					}

					if (!isAllNodeModules) {
						throw new Error(`[Werror] ${log.message}`);
					}
				}

				handler(level, log);
			},
		},
	},
});
