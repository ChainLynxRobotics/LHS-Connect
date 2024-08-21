<script lang="ts">
	import ValidatedInputGroup from "$components/form/ValidatedInputGroup.svelte";
    import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import { InputAddon, Button } from "flowbite-svelte";
	import QrCodeCard from "$components/QrCodeCard.svelte";

    let validate = false;

    let formIsValid = {
        url: false,
		suffix: false
	};
	let formValues = {
        url: '',
		suffix: ''
	};


</script>

<div class="flex w-full gap-8 flex-col items-center md:flex-row md:items-start">
    <form class="w-full">

        <div class="mb-6">
            <ValidatedInputGroup
                id="suffix"
                label="Short Url (Only letters, numbers, and hyphens)"
                contentName="Field"
                validate={validate || !!formValues.suffix}
                required
                pattern={/^[a-zA-Z0-9-]{1,32}$/}
                bind:isValid={formIsValid.suffix}
                bind:value={formValues.suffix}
                inputProps={{ type: 'text' }}
            >
                <InputAddon slot="before"><span class="text-nowrap">https://lhs.cx/</span></InputAddon>
            </ValidatedInputGroup>
        </div>
        
        <div class="mb-6">
            <ValidatedInput
                id="url"
                label="Redirect Url"
                contentName="Url"
                validate={validate || !!formValues.url}
                required
                pattern={/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/}
                bind:isValid={formIsValid.url}
                bind:value={formValues.url}
                inputProps={{ type: 'url', placeholder: 'Paste URL Here' }}
            />
        </div>

        <div class="mb-6 w-full flex justify-center">
            <Button type="submit">Generate Short Link</Button>
        </div>

    </form>
    <QrCodeCard data={'https://lhs.cx/'+formValues.suffix} />
</div>