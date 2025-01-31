<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import { Button, Card, Listgroup, ListgroupItem } from "flowbite-svelte";
	import pages from "./pages";
    import { Permissions } from "$lib/auth/permissions";
	import type { PageData } from "./$types";
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import announcementValidator from "$lib/validation/crud/announcementValidator";
	import adminApiClient from "$lib/util/adminApiClient";
	import { invalidate } from "$app/navigation";
	import { getNotificationContext } from "$components/NotificationProvider.svelte";

	let { data }: { data: PageData } = $props();

    const notificationContext = getNotificationContext();

    let announcementInput: ValidatedInput<'text'> | undefined = undefined;

    let announcement = $state(data.announcement?.text || '');
    $effect(() => {announcement = data.announcement?.text || ''});

    async function saveAnnouncement() {
        const data = {
            text: await announcementInput?.validate()
        }

        await adminApiClient.baseApiRequest('POST', '/crud/announcement', data).catch((e)=>{
			invalidate('/api/v1/crud/announcement');
			notificationContext.show(e.message, 'error');
		});
    }

</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Dashboard" />

		<div class="w-full flex flex-wrap gap-6 items-start justify-center md:justify-start mb-12">
            {#each pages as page, i}
                {@const IconComponent = page.icon}
                {#if !page.hidden && (!page.permission || Permissions.has(data.session, page.permission)) && !(page.href == '/admin/panel')}
                    <Card size="sm">
                        <IconComponent class="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{page.label}</h5>
                        {#if page.children}
                            <Listgroup active class="border-0 dark:!bg-transparent">
                                {#each page.children as item}
                                    <ListgroupItem href={page.href}>
                                        {item.label}
                                    </ListgroupItem>
                                {/each}
                            </Listgroup>
                        {/if}
                        <div class="flex gap-4 mt-4">
                            {#if page.href}
                                <Button href={page.href} class="w-fit">Edit</Button>
                            {/if}
                            {#if page.publicHref}
                                <Button href={page.publicHref} target="_blank" color="alternative" class="w-fit">View Public Page</Button>
                            {/if}
                        </div>
                    </Card>
                {/if}
            {/each}
        </div>

        <SectionHeader title="Announcement" />
        <p class="mb-4">This displays at the top of every public page, and can be dismissed. (Supports inline markdown)</p>
        <div class="w-full flex gap-4 items-end mb-12">
            <div class="w-full">
                <ValidatedInput
                    bind:this={announcementInput}
                    id="text"
                    label="Announcement Text"
                    bind:value={announcement}
                    validatorObject={announcementValidator}
                    inputProps={{ placeholder: "Leave blank for none" }}
                />
            </div>
            <Button onclick={saveAnnouncement}>Save</Button>
        </div>
    </div>
</div>
