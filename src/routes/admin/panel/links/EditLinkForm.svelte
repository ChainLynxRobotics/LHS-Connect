<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import shortLinkSchema from "$lib/schemas/shortLinkSchema";
	import type { ShortLinkData } from "$lib/types/LinkGeneratorData";
	import { Button } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";


    export let link: ShortLinkData;

    const dispatch = createEventDispatcher<{
        submit: ShortLinkData;
        cancel: null;
    }>();

    let suffix = link.suffix;
    let url = link.url;
    let password = link.password;

    let suffixInput: ValidatedInput<'suffix'>;
    let urlInput: ValidatedInput<'url'>;
    let passwordInput: ValidatedInput<'password'>;

    async function handleEditModalSubmit(e: SubmitEvent) {
        const link = {
            suffix: await suffixInput.validate(),
            url: await urlInput.validate(),
            password: await passwordInput.validate()
        };
        dispatch('submit', link);
    }

</script>

<form class="flex flex-col space-y-6" on:submit|preventDefault={handleEditModalSubmit}>
    <div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Club</h3>
	</div>
    <div>
		<ValidatedInput
			bind:this={suffixInput}
			id="suffix"
			label="Suffix"
			bind:value={suffix}
			validatorObject={shortLinkSchema}
			visuallyRequired
		/>
	</div>
    <div>
        <ValidatedInput
            bind:this={urlInput}
            id="url"
            label="Url"
            bind:value={url}
            validatorObject={shortLinkSchema}
            visuallyRequired
            inputProps={{ type: 'url' }}
        />
    </div>
    <div>
        <ValidatedInput
            bind:this={passwordInput}
            id="password"
            label="Password"
            bind:value={password}
            validatorObject={shortLinkSchema}
        />
    </div>

    <div class="mb-4 mt-6 flex gap-4 justify-center">
		<Button type="button" color="alternative" on:click={() => dispatch('cancel')}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>

