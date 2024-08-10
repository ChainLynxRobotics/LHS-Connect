<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
    import SectionHeader from "$components/SectionHeader.svelte";

    let validate = false;

    let formIsValid = {
        email: false
    };
    let formValues = {
        email: ''
    };
</script>

<SectionHeader title="Contact Us" />
<form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <ValidatedInput 
            type="email"
            placeholder="name@email.com"
            {validate} 
            bind:isValid={formIsValid.email} 
            bind:value={formValues.email} 
            contentName="Email" 
            required 
            pattern={/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
        />
    </div>
</form>