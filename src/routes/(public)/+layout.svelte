<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { GlobalPageData } from '$lib/types/GlobalPageData';
	import type { Snippet } from 'svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import QuickLinks from './QuickLinks.svelte';
	import { fly } from 'svelte/transition';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { data, children }: Props = $props();

	// Page transitions
	const duration = 200;
	const delay = duration + 50;
	const y = 10;
	const transitionIn = { easing: cubicOut, y, duration, delay };
	const transitionOut = { easing: cubicIn, y: -y, duration };
</script>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<Header></Header>
	<div class="flex w-full flex-col items-center">
		<QuickLinks />
	</div>

	{#key data.pathname}
		<div in:fly={transitionIn} out:fly={transitionOut}>
			{@render children?.()}
		</div>
	{/key}
</div>
<Footer data={data.footer}></Footer>
