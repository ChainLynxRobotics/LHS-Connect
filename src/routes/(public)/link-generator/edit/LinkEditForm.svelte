<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import shortLinkValidator from '$lib/validation/crud/shortLinkValidator';
	import { Button } from 'flowbite-svelte';

	interface Props {
		suffix: string;
		password: string;
		url?: string;
		hits?: number;
		createdAt?: number;
	}

	let { suffix, password, url = $bindable(''), hits = 0, createdAt = 0 }: Props = $props();

	let urlInput: ValidatedInput<'url'> | undefined = $state();

	async function onsubmit() {
		const shortLinkData = {
			suffix,
			url: await urlInput!.validate(),
			password
		};
		console.log(shortLinkData);
		alert('TODO');
	}
</script>

<div
	class="flex w-full flex-col items-center gap-16 rounded-xl bg-slate-100 p-8 dark:bg-gray-800 md:flex-row"
>
	<div
		class="relative h-32 w-32 flex-shrink-0 rounded-full border-4 border-primary-500 shadow-2xl shadow-primary-500"
	>
		<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-7">
			<span class="text-5xl font-extrabold">{hits}</span>
		</span>
		<div class="ribbon absolute bottom-1 left-0 right-0 bg-primary-400 text-white">
			<span class="block text-center font-bold">Link Uses</span>
		</div>
	</div>
	<div class="w-full">
		<form class="flex w-full gap-4" {onsubmit}>
			<div class="w-full">
				<ValidatedInput
					bind:this={urlInput}
					id="url"
					label={(suffix ? `lhs.cx/${suffix}` : 'Short Link') + ' redirects to:'}
					bind:value={url}
					visuallyRequired
					validatorObject={shortLinkValidator}
					inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
				/>
			</div>
			<Button type="submit" class="mt-7 h-min">Save</Button>
		</form>
		<div class="mt-4">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Created on {new Date(createdAt).toLocaleDateString()} at {new Date(
					createdAt
				).toLocaleTimeString()}
			</p>
		</div>
	</div>
</div>

<style>
	.ribbon {
		--inset: 0.5rem;
		clip-path: polygon(
			0 0,
			100% 0,
			calc(100% - var(--inset)) 50%,
			100% 100%,
			0 100%,
			var(--inset) 50%
		);
	}
</style>
