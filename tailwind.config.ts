import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#fef2f2',
					'100': '#fee2e2',
					'200': '#fecaca',
					'300': '#fca5a5',
					'400': '#f87171',
					'500': '#f05252',
					'600': '#dc2626',
					'700': '#b91c1c',
					'800': '#991b1b',
					'900': '#7f1d1d',
					'950': '#450a0a'
				}
			}
		}
	},

	plugins: [flowbite],

	darkMode: 'class',

	safelist: [
		'w-64',
		'w-1/2',
		'rounded-l-lg',
		'rounded-r-lg',
		'bg-gray-200',
		'grid-cols-4',
		'grid-cols-7',
		'h-6',
		'leading-6',
		'h-9',
		'leading-9',
		'shadow-lg'
	]
} as Config;
