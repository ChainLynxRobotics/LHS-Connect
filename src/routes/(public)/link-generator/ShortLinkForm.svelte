<script lang="ts">
	import ValidatedInputGroup from '$components/form/ValidatedInputGroup.svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { InputAddon, Button, Helper } from 'flowbite-svelte';
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import shortLinkSchema from '$lib/schemas/shortLinkSchema';
	import { AngleDownOutline, AngleUpOutline, EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import { slide } from 'svelte/transition';

	let suffixInput: ValidatedInputGroup<'suffix'>;
	let urlInput: ValidatedInput<'url'>;
	let passwordInput: ValidatedInput<'password'>;

	let suffix: string = '';
	let url: string = '';
	let password: string = '';

	let qrOpen: boolean = false;

	let advancedOpen: boolean = false;
	let passwordVisible: boolean = false;
</script>

<div class="flex w-full flex-col items-center justify-center gap-8 pt-8 md:flex-row">
	<form on:submit|preventDefault={() => alert('TODO')} class="w-full max-w-md">
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
				<InputAddon slot="before"><span class="text-nowrap">https://lhs.cx/</span></InputAddon>
			</ValidatedInputGroup>
		</div>

		<div class="mb-6">
			<ValidatedInput
				bind:this={urlInput}
				id="url"
				label="Redirect Url"
				bind:value={url}
				visuallyRequired
				validatorObject={shortLinkSchema}
				inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
			/>
		</div>

		<div class="mb-6 flex w-full justify-center">
			<Button type="submit">Generate Short Link</Button>
		</div>

		<button type="button" class="flex items-center gap-2 text-primary-500" on:click={()=>advancedOpen = ! advancedOpen}>
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
							<Button slot="before" type="button" on:click={() => (passwordVisible = !passwordVisible)} class="pointer-events-auto">
								{#if passwordVisible}
									<EyeOutline class="w-6 h-6" />
								{:else}
									<EyeSlashOutline class="w-6 h-6" />
								{/if}
							</Button>
						</ValidatedInputGroup>
					</div>
					<Helper>
						Adding a password when creating a link allows you to come back and edit it or view how many clicks it has.
						Use the button below <i>after</i> you have have generated the link using the button above.
					</Helper>
					<div class="flex justify-center mt-8">
						<Button type="button" color="alternative" href="/link-generator/edit">Edit Existing Link</Button>
					</div>
				</div>
			</div>
			
		{/if}
	</form>
	{#if qrOpen}
		<QrCodeCard data={'https://lhs.cx/' + suffix} />
	{/if}
</div>
