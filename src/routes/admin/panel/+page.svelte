<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import { Button, Card, Listgroup, ListgroupItem } from "flowbite-svelte";
	import pages from "./pages";
    import { Permissions } from "$lib/auth/permissions";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Dashboard" />

		<div class="w-full flex flex-wrap gap-6 items-start justify-center md:justify-start">
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
    </div>
</div>
