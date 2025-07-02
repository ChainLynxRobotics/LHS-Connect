<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { slide } from 'svelte/transition';
	import LinkLoginForm from './LinkLoginForm.svelte';
	import { A, Alert, Button, Spinner } from 'flowbite-svelte';
	import { ArrowLeftOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import LinkEditForm from './LinkEditForm.svelte';
	import apiRequest from '$lib/util/apiClient';
	import type { IPublicShortLink, IShortLinkLogin } from '$api/short_link/types';

	let linkData: Promise<IPublicShortLink> | undefined = $state(undefined);
	let linkPassword: string = $state(''); // We must sync the password between the two forms

	async function handleLogin(linkLoginData: IShortLinkLogin) {
		linkPassword = linkLoginData.password;
		linkData = apiRequest(
			'GET',
			`/short_link?suffix=${encodeURIComponent(linkLoginData.suffix)}&password=${encodeURIComponent(linkLoginData.password)}`
		).then((res) => res.result as IPublicShortLink);
	}
</script>

<svelte:head>
	<title>LHS Connect | Link Editor</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<div class="mb-8">
			<Button outline color="alternative" href="/link-generator"
				><ArrowLeftOutline /> Back to Link Generator</Button
			>
		</div>
		<SectionHeader title="Short Link Editor" />
		<p class="mt-4 indent-8">
			If you already created a short link, you can edit it here. Just paste the short link in the
			box below with its password and click "Verify" to proceed.
		</p>
		<p class="mb-12 mt-4 indent-8">
			If you do not have a password, <A href="/about?type=other#contact" class="indent-0"
				>contact us</A
			> and we can reset the password and/or edit it for you.
		</p>

		<LinkLoginForm onSubmit={handleLogin} onChange={() => (linkData = undefined)} />

		{#if linkData}
			{#await linkData}
				<div class="mt-16 flex w-full justify-center">
					<Spinner class="h-12 w-12 text-primary-500" />
				</div>
			{:then data}
				<div class="mt-16" transition:slide>
					<LinkEditForm
						linkData={data}
						password={linkPassword}
						onDelete={() => (linkData = undefined)}
					/>
				</div>
			{:catch error}
				<div class="mt-8" transition:slide>
					<Alert type="error">
						<InfoCircleSolid slot="icon" class="h-5 w-5" />
						<span>Error: {error.message}</span>
					</Alert>
				</div>
			{/await}
		{/if}
	</div>
</div>
