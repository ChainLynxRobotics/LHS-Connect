import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-netlify';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			adapter: adapter({
				edge: false,
			}),
			alias: {
				$lib: './src/lib',
				$components: './src/lib/components',
				$assets: './src/lib/assets',
				$styles: './src/lib/styles',
				$api: './src/routes/api/v2',
			},
		}),
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
