<script lang="ts">
	import { page } from "$app/stores";
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import ValidatedInputGroup from "$components/form/ValidatedInputGroup.svelte";
	import shortLinkSchema from "$lib/schemas/shortLinkSchema";
	import { Button, InputAddon } from "flowbite-svelte";
	import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
	import { createEventDispatcher } from "svelte";

    export let suffix = $page.url.searchParams.get('suffix') || '';
    export let password = '';

    $: suffix = suffix.replace('https://lhs.cx/', '');

    let suffixInput: ValidatedInput<'suffix'>;
    let passwordInput: ValidatedInput<'password'>;

    const dispatch = createEventDispatcher<{
        submit: { suffix: string; password: string; }
    }>();

    async function handleSubmit() {
        const linkLoginData = {
            suffix: await suffixInput.validate(),
            password: await passwordInput.validate()
        }
        dispatch('submit', linkLoginData);
    }

    let passwordVisible = false;
</script>

<form class="w-full flex gap-8 flex-col md:flex-row" on:submit|preventDefault={handleSubmit}>
    <div class="flex-1">
        <ValidatedInputGroup
            bind:this={suffixInput}
            id="suffix"
            label="Short Url (Only letters, numbers, and hyphens)"
            bind:value={suffix}
            visuallyRequired
            validatorObject={shortLinkSchema}
            inputProps={{ type: 'text' }}
            on:change={() => console.log(suffix)}
        >
            <InputAddon slot="before"><span class="text-nowrap">https://lhs.cx/</span></InputAddon>
        </ValidatedInputGroup>
    </div>
    <div class="flex-1 flex gap-8">
        <div class="w-full">
            <ValidatedInputGroup
                bind:this={passwordInput}
                id="password"
                label="Password"
                bind:value={password}
                validatorObject={shortLinkSchema}
                inputProps={{ type: passwordVisible ? 'text' : 'password' }}
            >
                <Button slot="before" type="button" on:click={() => (passwordVisible = !passwordVisible)} class="pointer-events-auto">
                    {#if passwordVisible}
                        <EyeOutline class="w-6 h-6" />
                    {:else}
                        <EyeSlashOutline class="w-6 h-6" />
                    {/if}
                </Button>
            </ValidatedInputGroup>
        </div>
        <Button type="submit" class="h-min mt-7">Verify</Button>
    </div>
</form>