<script lang="ts">
	import type { IPublicShortLink } from '$api/short_link/types';
	import { shortLinkUrlUpdateValidator } from '$api/short_link/validator';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import { PUBLIC_BASE_SHORT_URL } from '$env/static/public';
	import apiRequest from '$lib/util/apiClient';
	import { Button, Modal } from 'flowbite-svelte';

	interface Props {
		linkData: IPublicShortLink;
		password: string;
		onDelete?: () => void;
	}

	let { linkData, password, onDelete }: Props = $props();

	const notificationContext = getNotificationContext();

	let url = $state(linkData.url);
	let urlInput: ValidatedInput<'url'> | undefined = $state();

	let deleteConfirmOpen = $state(false);

	async function onsubmit() {
		const shortLinkData = {
			url: await urlInput!.validate(),
		};
		const res = await apiRequest(
			'PATCH',
			`/short_link?suffix=${encodeURIComponent(linkData.suffix)}&password=${encodeURIComponent(password)}`,
			shortLinkData
		).catch((error) => notificationContext.show(error.message, 'error'));
		url = res.result.url; // Update the URL

		notificationContext.show('Short Link Updated!', 'success');
	}

	async function deleteLink() {
		await apiRequest(
			'DELETE',
			`/short_link?suffix=${encodeURIComponent(linkData.suffix)}&password=${encodeURIComponent(password)}`
		).catch((error) => notificationContext.show(error.message, 'error'));
		notificationContext.show('Short Link Deleted!', 'success');
		onDelete?.();
	}
</script>

<div
	class="flex w-full flex-col items-center gap-16 rounded-xl bg-slate-100 p-8 dark:bg-gray-800 md:flex-row"
>
	<div
		class="relative h-32 w-32 flex-shrink-0 rounded-full border-4 border-primary-500 shadow-2xl shadow-primary-500"
	>
		<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-7">
			<span class="text-5xl font-extrabold">{linkData.uses}</span>
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
					label={(linkData.suffix ? `${PUBLIC_BASE_SHORT_URL}/${linkData.suffix}` : 'Short Link') +
						' redirects to:'}
					bind:value={url}
					visuallyRequired
					validatorObject={shortLinkUrlUpdateValidator}
					inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
				/>
			</div>
			<Button type="submit" class="mt-7 h-min">Save</Button>
		</form>
		<div class="mt-4">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Created on {new Date(linkData.createdAt).toLocaleDateString()} at {new Date(
					linkData.createdAt
				).toLocaleTimeString()}
			</p>
		</div>
		<div class="mt-4">
			<Button type="button" outline color="red" onclick={() => (deleteConfirmOpen = true)}
				>Delete Short Link</Button
			>
		</div>
	</div>
</div>
<Modal title="Are you sure?" bind:open={deleteConfirmOpen} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		You are about to delete the short link <code>{PUBLIC_BASE_SHORT_URL}/{linkData.suffix}</code>.
		<b>This cannot be undone.</b>
	</p>
	<svelte:fragment slot="footer">
		<Button type="button" color="red" onclick={deleteLink}>Delete</Button>
		<Button type="button" color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>

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
