import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-cloudflare';
import { defineConfig } from 'vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [enhancedImages(), 
		sveltekit({
			preprocess: vitePreprocess(),
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
		})
	],
	build: {
		rollupOptions: {
			onwarn(warning) {
				throw new Error(`[Werror] ${warning.message}`);
			},
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
					if (!isAllNodeModules) throw new Error(`[Werror] ${log.message}`);
				}
				handler(level, log);
			},
		},
	},
});
