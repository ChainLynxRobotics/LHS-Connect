<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { slide } from 'svelte/transition';
	import LinkLoginForm from './LinkLoginForm.svelte';

    let suffix: string;
	let password: string;
	let isAuthenticated: boolean;
</script>

<svelte:head>
	<title>LHS Connect | Link Generator</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Link Editor" />
		<p class="mb-12 mt-4 indent-8">
			If you already created a short link, you can edit it here. Just paste the short link in the box below with its password and click "Verify" to proceed.
		</p>

		<LinkLoginForm bind:suffix bind:password bind:isAuthenticated />

		{#if isAuthenticated}
			<div transition:slide>

			</div>
		{/if}
	</div>
</div>
