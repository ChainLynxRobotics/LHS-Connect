<script lang="ts">
	import { Button, Label, MultiSelect } from 'flowbite-svelte';
	import { Permission, PermissionValues, Permissions } from '$lib/auth/permissions';
	import type { ISerializedUser, IAdminUserUpdate } from '$api/users/types';

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
			permissions: new Permissions(selectedPermissions).get(),
		});
	}
</script>

<form class="flex flex-col gap-y-6" {onsubmit}>
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit User</h3>
	</div>
	<div class="min-h-80">
		<Label for="permissions" class="mb-2">Permissions</Label>
		<MultiSelect items={permissionOptions} bind:value={selectedPermissions} />
	</div>

	<div class="mb-4 mt-6 flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
