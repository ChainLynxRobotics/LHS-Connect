<script lang="ts">
	import { dev } from '$app/environment';
	import NotificationProvider from '$components/NotificationProvider.svelte';
	import type { ThemeContext } from '$components/ThemeSwitch.svelte';
	import '$lib/styles/tailwind.css';
	import { onMount, setContext, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let theme = setContext<ThemeContext>('theme', writable(undefined));

	onMount(() => {
		if (
			localStorage.getItem('theme') === 'dark' ||
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			theme.set('dark');
		}

		if (dev) localStorage.setItem('umami.disabled', '1');
		else localStorage.removeItem('umami.disabled');
	});

	$effect(() => {
		if ($theme !== undefined) {
			localStorage.setItem('theme', $theme);
			if ($theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
</script>

<NotificationProvider>
	{@render children?.()}
</NotificationProvider>
