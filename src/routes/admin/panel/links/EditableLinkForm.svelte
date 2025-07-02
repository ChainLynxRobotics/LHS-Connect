<script lang="ts">
	import type { IPublicShortLink, IShortLinkAdminUpdate } from '$api/shortLink/types';
	import { shortLinkAdminUpdateValidator } from '$api/shortLink/validator';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import apiRequest from '$lib/util/apiClient';
	import { Alert, Button, Label, Modal } from 'flowbite-svelte';
	import { CheckOutline, CloseOutline, InfoCircleSolid } from 'flowbite-svelte-icons';

	interface Props {
		link: IPublicShortLink;
		onSubmit: (link: IShortLinkAdminUpdate) => void;
		onCancel: () => void;
	}

	let { link, onSubmit: submit, onCancel: cancel }: Props = $props();

	const notificationContext = getNotificationContext();

	let suffix = $state(link.suffix);
	let url = $state(link.url);

	let suffixInput: ValidatedInput<'suffix'> | undefined = $state();
	let urlInput: ValidatedInput<'url'> | undefined = $state();

	let resetPasswordConfirm = $state(false);
	let newPassword = $state<string|undefined>(undefined);

	async function onsubmit(e: Event) {
		e.preventDefault();
		submit({
			...link,
			suffix: await suffixInput!.validate(),
			url: await urlInput!.validate()
		});
	}

	async function resetPassword() {
		const res = await apiRequest('POST', `/shortLinks/edit/${link.id}/resetPassword`)
			.catch((e) => notificationContext.show(e.message, 'error'));
		newPassword = res.password;
		resetPasswordConfirm = false;
	}
</script>

<form class="flex flex-col gap-y-6" {onsubmit}>
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Short Link</h3>
	</div>
	<div>
		<ValidatedInput
			bind:this={suffixInput}
			id="suffix"
			label="Suffix"
			bind:value={suffix}
			validatorObject={shortLinkAdminUpdateValidator}
			visuallyRequired
		/>
	</div>
	<div>
		<ValidatedInput
			bind:this={urlInput}
			id="url"
			label="Url"
			bind:value={url}
			validatorObject={shortLinkAdminUpdateValidator}
			visuallyRequired
			inputProps={{ type: 'url' }}
		/>
	</div>
	<div class="flex items-center">
		<Label for="hasPassword">Has Password?</Label>
		{#if link.hasPassword || newPassword}
			<CheckOutline class="h-6 w-6" />
		{:else}
			<CloseOutline class="h-6 w-6" />
		{/if}
		<Button type="button" color="light" size="xs" class="ml-2" onclick={()=>resetPasswordConfirm = true}>Generate New Password</Button>
	</div>
	{#if newPassword}
		<Alert color="blue" border>
			<InfoCircleSolid slot="icon" class="w-5 h-5" />
			<span>The new password is: <code class="text-xl">{newPassword}</code></span>
		</Alert>
	{/if}

	<div class="mb-4 mt-6 flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>

<Modal bind:open={resetPasswordConfirm} title="Generate New Password" autoclose autofocus>
	<p class="text-gray-700 dark:text-gray-300">Are you sure you want to generate a new password for this link? {#if link.hasPassword}This will overwrite the previous onemptied.{/if}</p>
	<svelte:fragment slot="footer">
		<Button color="red" outline on:click={resetPassword}>Yes</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>
