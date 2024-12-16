<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import type { IPublicShortLink, IShortLinkAdminUpdate } from '$lib/types/crud/shortLink';
	import type { IAdminUserUpdate, ISerializedUser } from '$lib/types/user';
	import apiRequest from '$lib/util/apiClient';
	import { shortLinkAdminUpdateValidator } from '$lib/validation/shortLinkValidator';
	import { Alert, Button, Label, Modal, MultiSelect } from 'flowbite-svelte';
	import { CheckOutline, CloseOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
    import { Permission, PermissionValues, Permissions } from "$lib/auth/permissions";

	interface Props {
		user: ISerializedUser;
		onSubmit: (user: IAdminUserUpdate) => void;
		onCancel: () => void;
	}

	let { user, onSubmit: submit, onCancel: cancel }: Props = $props();

    const permissionOptions = PermissionValues.map((p) => ({ value: p, name: Permission[p] }));
	let selectedPermissions = $state(new Permissions(user.permissions).toArray());

	async function onsubmit(e: Event) {
		e.preventDefault();
		submit({
			permissions: new Permissions(selectedPermissions).get()
		});
	}
</script>

<form class="flex flex-col gap-y-6" {onsubmit}>
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit User</h3>
	</div>
	<div class="min-h-80">
        <Label for="permissions" class="mb-2">Permissions</Label>
        <MultiSelect 
            items={permissionOptions} 
            bind:value={selectedPermissions}
        />
	</div>

	<div class="mb-4 mt-6 flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
