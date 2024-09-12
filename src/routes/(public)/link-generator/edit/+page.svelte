<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { slide } from 'svelte/transition';
	import LinkLoginForm from './LinkLoginForm.svelte';
	import { Alert, Spinner } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

    let suffix: string;
	let password: string;
	
	function handleLogin(event: CustomEvent<{ suffix: string; password: string }>) {
		suffix = event.detail.suffix;
		password = event.detail.password;
		refreshData();
	}

	let linkData: Promise<{ url: string, hits: number, createdAt: number }>|undefined = undefined;
	function refreshData() {
		linkData = fetch(`/api/links/${suffix}/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		}).then(res => res.json());
	}
</script>

<svelte:head>
	<title>LHS Connect | Link Editor</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Link Editor" />
		<p class="mb-12 mt-4 indent-8">
			If you already created a short link, you can edit it here. Just paste the short link in the box below with its password and click "Verify" to proceed.
		</p>

		<LinkLoginForm bind:suffix bind:password on:submit={handleLogin} />

		{#if linkData}
			{#await linkData}
				<div class="w-full flex justify-center">
					<Spinner class="w-12 h-12 text-primary-500" />
				</div>
			{:then data} 
				<div transition:slide>
					
				</div>
			{:catch error}
				<div transition:slide>
					<Alert type="error">
						<InfoCircleSolid slot="icon" class="w-5 h-5" />
						<span>Error: {error.message}</span>
					</Alert>
				</div>
			{/await}
		{/if}
	</div>
</div>
