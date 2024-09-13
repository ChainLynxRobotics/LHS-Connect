<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import shortLinkSchema from "$lib/schemas/shortLinkSchema";
	import { Button } from "flowbite-svelte";


    export let suffix: string;
    export let password: string;
    
    export let url: string = '';
    export let hits: number = 0;
    export let createdAt: number = 0;

    let urlInput: ValidatedInput<'url'>;

    async function handleSubmit() {
        const shortLinkData = {
            suffix,
            url: await urlInput.validate(),
            password
        }
        console.log(shortLinkData);
        alert('TODO');
    }

</script>

<div class="w-full flex flex-col md:flex-row items-center p-8 gap-16 rounded-xl bg-slate-100 dark:bg-gray-800">
    <div class="flex-shrink-0 w-32 h-32 border-4 border-primary-500 rounded-full relative shadow-2xl shadow-primary-500">
        <span class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-7 absolute">
            <span class="text-5xl font-extrabold">{hits}</span>
        </span>
        <div class="ribbon absolute left-0 bottom-1 right-0 bg-primary-400 text-white">
            <span class="text-center block font-bold">Link Uses</span>
        </div>
    </div>
    <div class="w-full">
        <form class="w-full flex gap-4" on:submit|preventDefault={handleSubmit}>
            <div class="w-full">
                <ValidatedInput
                    bind:this={urlInput}
                    id="url"
                    label={(suffix ? `lhs.cx/${suffix}` : 'Short Link') + ' redirects to:'}
                    bind:value={url}
                    visuallyRequired
                    validatorObject={shortLinkSchema}
                    inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
                />
            </div>
            <Button type="submit" class="h-min mt-7">Save</Button>
        </form>
        <div class="mt-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Created on {new Date(createdAt).toLocaleDateString()} at {new Date(createdAt).toLocaleTimeString()}</p>
        </div>
    </div>
</div>

<style>
    .ribbon {
        --inset: 0.5rem;
        clip-path: polygon(0 0, 100% 0, calc(100% - var(--inset)) 50%, 100% 100%, 0 100%, var(--inset) 50%);
    }
</style>