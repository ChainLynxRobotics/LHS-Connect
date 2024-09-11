<script lang="ts">
	import ValidatedInputGroup from '$components/form/ValidatedInputGroup.svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { InputAddon, Button, Accordion, AccordionItem } from 'flowbite-svelte';
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import shortLinkSchema from '$lib/schemas/shortLinkSchema';

	let suffixInput: ValidatedInputGroup<'suffix'>;
	let urlInput: ValidatedInput<'url'>;
	let passwordInput: ValidatedInput<'password'>;

	let suffix: string = '';
	let url: string = '';
	let password: string = '';
</script>

<div class="flex w-full flex-col items-center gap-8 md:flex-row md:items-start">
	<form on:submit|preventDefault={() => alert('TODO')} class="w-full">
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

		<!-- <button type="button" class="flex items-center gap-2 text-primary-500" on:click={()=>advancedOpen = ! advancedOpen}>
			{#if advancedOpen}
				<AngleUpOutline />
			{:else}
				<AngleDownOutline />
			{/if}
			Advanced Options
		</button> -->

		<Accordion flush>
			<AccordionItem>
				<div slot="header">Advanced Options</div>
				<div>
					<ValidatedInput
						bind:this={passwordInput}
						id="password"
						label="Password"
						bind:value={password}
						validatorObject={shortLinkSchema}
						inputProps={{ type: 'password' }}
					/>
				</div>
			</AccordionItem>
		</Accordion>
	</form>
	<QrCodeCard data={'https://lhs.cx/' + suffix} />
</div>
