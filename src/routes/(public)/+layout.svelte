<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { onMount, type Snippet } from 'svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import QuickLinks from './QuickLinks.svelte';
	import { fly, slide } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

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

	// Announcement
	let lastDismissedAnnouncement = $state(0); // Epoch time
	onMount(() => {
		lastDismissedAnnouncement = parseInt(localStorage.getItem('lastDismissedAnnouncement') || '0');
	});
	function dismissAnnouncement() {
		lastDismissedAnnouncement = Date.now();
		localStorage.setItem('lastDismissedAnnouncement', lastDismissedAnnouncement.toString());
	}
</script>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<Header></Header>
	{#if data.announcement.text && lastDismissedAnnouncement < new Date(data.announcement.updatedAt).getTime()}
		<div transition:slide class="flex w-full flex-col items-center pt-2 px-4">
			<Alert color="yellow" dismissable on:click={dismissAnnouncement} class="container">
				<InfoCircleSolid slot="icon" class="w-5 h-5" />
				{data.announcement.text}
			</Alert>
		</div>
	{/if}
	<div class="flex w-full flex-col items-center">
		<QuickLinks />
	</div>

	{#key data.pathname}
		<div in:fly={transitionIn} out:fly={transitionOut}>
			{@render children?.()}
		</div>
	{/key}
</div>
<Footer usefulLinks={data.usefulLinks}></Footer>
