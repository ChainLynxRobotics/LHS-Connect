<script context="module" lang="ts">
	export type ThemeContext = Writable<'light' | 'dark' | undefined>;
</script>

<script lang="ts">
	import '$lib/styles/tailwind.css';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let theme = setContext<ThemeContext>('theme', writable(undefined));

	onMount(() => {
		if (
			localStorage.getItem('theme') === 'dark' ||
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			theme.set('dark');
		}
	});

	$: if ($theme !== undefined) {
		localStorage.setItem('theme', $theme);
		if ($theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<slot></slot>
