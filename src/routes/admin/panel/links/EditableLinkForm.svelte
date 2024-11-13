<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import shortLinkSchema from '$lib/schemas/shortLinkSchema';
	import type { ShortLinkData } from '$lib/types/LinkGeneratorData';
	import { Button } from 'flowbite-svelte';

	interface Props {
		link: ShortLinkData;
		onSubmit: (link: ShortLinkData) => void;
		onCancel: () => void;
	}

	let { link, onSubmit: submit, onCancel: cancel }: Props = $props();

	let suffix = $state(link.suffix);
	let url = $state(link.url);
	let password = $state(link.password);

	let suffixInput: ValidatedInput<'suffix'> | undefined = $state();
	let urlInput: ValidatedInput<'url'> | undefined = $state();
	let passwordInput: ValidatedInput<'password'> | undefined = $state();

	async function onsubmit(e: Event) {
		e.preventDefault();
		const link = {
			suffix: await suffixInput!.validate(),
			url: await urlInput!.validate(),
			password: await passwordInput!.validate()
		};
		submit(link);
	}
</script>

<form class="flex flex-col space-y-6" {onsubmit}>
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Club</h3>
	</div>
	<div>
		<ValidatedInput
			bind:this={suffixInput}
			id="suffix"
			label="Suffix"
			bind:value={suffix}
			validatorObject={shortLinkSchema}
			visuallyRequired
		/>
	</div>
	<div>
		<ValidatedInput
			bind:this={urlInput}
			id="url"
			label="Url"
			bind:value={url}
			validatorObject={shortLinkSchema}
			visuallyRequired
			inputProps={{ type: 'url' }}
		/>
	</div>
	<div>
		<ValidatedInput
			bind:this={passwordInput}
			id="password"
			label="Password"
			bind:value={password}
			validatorObject={shortLinkSchema}
		/>
	</div>

	<div class="mb-4 mt-6 flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
