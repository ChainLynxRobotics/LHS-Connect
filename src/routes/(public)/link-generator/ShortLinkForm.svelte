<script lang="ts">
	import ValidatedInputGroup from '$components/form/ValidatedInputGroup.svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { InputAddon, Button, Helper } from 'flowbite-svelte';
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import shortLinkSchema from '$lib/schemas/shortLinkSchema';
	import {
		AngleDownOutline,
		AngleUpOutline,
		EyeOutline,
		EyeSlashOutline
	} from 'flowbite-svelte-icons';
	import { slide } from 'svelte/transition';

	let suffixInput: ValidatedInputGroup<'suffix'> | undefined = $state();
	let urlInput: ValidatedInput<'url'> | undefined = $state();
	let passwordInput: ValidatedInputGroup<'password'> | undefined = $state();

	let suffix: string = $state('');
	let url: string = $state('');
	let password: string = $state('');

	let qrOpen: boolean = false;

	let advancedOpen: boolean = $state(false);
	let passwordVisible: boolean = $state(false);

	async function onsubmit(event: Event) {
		event.preventDefault();
		const shortLinkData = {
			suffix: await suffixInput!.validate(),
			url: await urlInput!.validate(),
			password: await passwordInput!.validate()
		};
		console.log(shortLinkData);
		alert('TODO');
	}
</script>

<div class="flex w-full flex-col items-center justify-center gap-8 pt-8 md:flex-row">
	<form {onsubmit} class="w-full max-w-md">
		<div class="mb-6">
			<ValidatedInputGroup
				bind:this={suffixInput}
				id="suffix"
				label="Short Url (Only letters, numbers, and hyphens)"
				bind:value={suffix}
				visuallyRequired
				validatorObject={shortLinkSchema}
				inputProps={{ type: 'text' }}
			>
				{#snippet before()}
					<InputAddon><span class="text-nowrap">https://lhs.cx/</span></InputAddon>
				{/snippet}
			</ValidatedInputGroup>
		</div>

		<div class="mb-6">
			<ValidatedInput
				bind:this={urlInput}
				id="url"
				label="Redirect Url"
				value={url}
				visuallyRequired
				validatorObject={shortLinkSchema}
				inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
			/>
		</div>

		<div class="mb-6 flex w-full justify-center">
			<Button type="submit">Generate Short Link</Button>
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
							validatorObject={shortLinkSchema}
							inputProps={{ type: passwordVisible ? 'text' : 'password' }}
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
	</form>
	{#if qrOpen}
		<QrCodeCard data={'https://lhs.cx/' + suffix} />
	{/if}
</div>
