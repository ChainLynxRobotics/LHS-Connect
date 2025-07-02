<script lang="ts">
	import ValidatedInputGroup from '$components/form/ValidatedInputGroup.svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { InputAddon, Button, Helper } from 'flowbite-svelte';
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import {
		AngleDownOutline,
		AngleUpOutline,
		EyeOutline,
		EyeSlashOutline
	} from 'flowbite-svelte-icons';
	import { fade, slide } from 'svelte/transition';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import apiRequest from '$lib/util/apiClient';
	import { PUBLIC_BASE_SHORT_URL } from '$env/static/public';
	import { shortLinkCreateValidator } from '$api/short_link/validator';

	const notificationContext = getNotificationContext();

	let suffixInput: ValidatedInputGroup<'suffix'> | undefined = $state();
	let urlInput: ValidatedInput<'url'> | undefined = $state();
	let passwordInput: ValidatedInputGroup<'password'> | undefined = $state();

	let suffix: string = $state('');
	let url: string = $state('');
	let password: string = $state('');

	let qrOpen: boolean = $state(false);

	let advancedOpen: boolean = $state(false);
	let passwordVisible: boolean = $state(false);

	async function onsubmit(event: Event) {
		event.preventDefault();
		const shortLinkData = {
			suffix: await suffixInput!.validate(),
			url: await urlInput!.validate(),
			password: await passwordInput?.validate()
		};
		
		apiRequest('POST', '/short_link', shortLinkData)
			.then(()=>{
				notificationContext.show('Short Link Created', 'success');
				qrOpen = true;
			})
			.catch((error) => notificationContext.show(error.message, 'error'));
	}

	function reset() {
		suffix = '';
		url = '';
		password = '';
		qrOpen = false;
	}
</script>

<div class="flex w-full flex-col items-center md:items-start justify-center gap-8 pt-8 md:flex-row">
	<form {onsubmit} class="w-full max-w-md relative p-4">
		<div class="mb-6">
			<ValidatedInputGroup
				bind:this={suffixInput}
				id="suffix"
				label="Short Url (Only letters, numbers, and hyphens)"
				bind:value={suffix}
				visuallyRequired
				validatorObject={shortLinkCreateValidator}
				inputProps={{ type: 'text', disabled: qrOpen }}
			>
				{#snippet before()}
					<InputAddon><span class="text-nowrap">{PUBLIC_BASE_SHORT_URL}/</span></InputAddon>
				{/snippet}
			</ValidatedInputGroup>
		</div>

		<div class="mb-6">
			<ValidatedInput
				bind:this={urlInput}
				id="url"
				label="Redirect Url"
				bind:value={url}
				visuallyRequired
				validatorObject={shortLinkCreateValidator}
				inputProps={{ type: 'url', placeholder: 'Paste URL Here', disabled: qrOpen }}
			/>
		</div>

		<div class="mb-6 flex w-full justify-center">
			<Button type="submit" disabled={qrOpen}>Generate Short Link</Button>
		</div>

		<button
			type="button"
			class="flex items-center gap-2 text-primary-500"
			onclick={() => (advancedOpen = !advancedOpen)}
		>
			{#if advancedOpen}
				<AngleUpOutline />
			{:else}
				<AngleDownOutline />
			{/if}
			Advanced Options
		</button>

		{#if advancedOpen}
			<div transition:slide>
				<div class="py-4">
					<div class="mb-2">
						<ValidatedInputGroup
							bind:this={passwordInput}
							id="password"
							label="Password"
							bind:value={password}
							validatorObject={shortLinkCreateValidator}
							inputProps={{ type: passwordVisible ? 'text' : 'password', disabled: qrOpen }}
						>
							{#snippet before()}
								<Button
									type="button"
									on:click={() => (passwordVisible = !passwordVisible)}
									class="pointer-events-auto"
								>
									{#if passwordVisible}
										<EyeOutline class="h-6 w-6" />
									{:else}
										<EyeSlashOutline class="h-6 w-6" />
									{/if}
								</Button>
							{/snippet}
						</ValidatedInputGroup>
					</div>
					<Helper>
						Adding a password when creating a link allows you to come back and edit it or view how
						many clicks it has.
					</Helper>
					<div class="mx-4 my-8 h-[1px] bg-gray-500"></div>
					<div class="mt-8 flex justify-center">
						<Button type="button" color="alternative" href="/link-generator/edit"
							>Edit Existing Link</Button
						>
					</div>
				</div>
			</div>
		{/if}

		{#if qrOpen}
			<div transition:fade class="absolute top-0 left-0 w-full h-full z-10 bg-white dark:bg-gray-900 !bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
				<Button
					type="button"
					color="light"
					on:click={reset}
				>
					Generate Another
				</Button>
			</div>
		{/if}
	</form>
	{#if qrOpen}
		<div transition:slide={{ axis: 'x' }}>
			<QrCodeCard data={new URL(`${suffix}`, PUBLIC_BASE_SHORT_URL).toString()} showLink />
		</div>
	{/if}
</div>
