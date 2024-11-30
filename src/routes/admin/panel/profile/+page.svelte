<script lang="ts">
    import { Permissions } from "$lib/auth/permissions";
	import { Avatar, Button, Card } from 'flowbite-svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const user = $derived(data.session.user);
    const permissionsStr = $derived(new Permissions(user.permissions).toString());
</script>

<div class="flex w-full flex-col flex-wrap items-center p-4 pb-16 pt-16">
    <Card padding="md">
        <div class="flex flex-col items-center mb-8">
            <Avatar size="lg" src={user.pfp} />
            <h5 class="mt-2 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.name}
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
            </span>

            <p class="text-sm mt-4 mb-4">
                The above information is collected from your google account. To change it, update it on your google account and log out and back in here.
            </p>

            <Button outline color="alternative" href="https://myaccount.google.com/personal-info" target="_blank">Google Account</Button>
        </div>
        

        <p><b>Permission{permissionsStr.includes(',') || permissionsStr.length === 0 ? 's' : ''}</b>: <code>{permissionsStr}</code></p>
        <p><b>User ID</b>: <code>{user.id}</code></p>

        <div class="flex w-full justify-center mt-4">
            <Button outline color="red" href="/admin/logout">Log Out</Button>
        </div>
    </Card>
</div>