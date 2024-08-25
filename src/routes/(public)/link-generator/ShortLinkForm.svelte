<script lang="ts">
	import ValidatedInputGroup from '$components/form/ValidatedInputGroup.svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { InputAddon, Button } from 'flowbite-svelte';
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import shortLinkSchema from '$lib/schemas/shortLinkSchema';

	let suffix: ValidatedInputGroup<'suffix'>;
	let url: ValidatedInput<'url'>;
</script>

<div class="flex w-full flex-col items-center gap-8 md:flex-row md:items-start">
	<form class="w-full">
		<div class="mb-6">
			<ValidatedInputGroup
				bind:this={suffix}
				id="suffix"
				label="Short Url (Only letters, numbers, and hyphens)"
				visuallyRequired
				validatorObject={shortLinkSchema}
				inputProps={{ type: 'text' }}
			>
				<InputAddon slot="before"><span class="text-nowrap">https://lhs.cx/</span></InputAddon>
			</ValidatedInputGroup>
		</div>

		<div class="mb-6">
			<ValidatedInput
				bind:this={url}
				id="url"
				label="Redirect Url"
				visuallyRequired
				validatorObject={shortLinkSchema}
				inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
			/>
		</div>

		<div class="mb-6 flex w-full justify-center">
			<Button type="submit">Generate Short Link</Button>
		</div>
	</form>
	<QrCodeCard data={'https://lhs.cx/' + suffix.value} />
</div>
