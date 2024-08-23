<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
    import { Button, Card, Checkbox, Modal } from "flowbite-svelte";

    let showValidation = false;

    let formIsValid = {
        email: false,
        password: false
    };
    let formValues = {
        email: '',
        password: ''
    };

    function handleSubmit(event: SubmitEvent) {
        if (Object.values(formIsValid).includes(false)) {
            console.log('Form is not valid');
            console.log(formIsValid, formValues);
            event.preventDefault();
        }
    }
    
</script>

<svelte:head>
	<title>LHS Connect Admin | Login</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pt-16">

    <Card>
        <form on:submit={handleSubmit} action="/" method="post" class="flex flex-col space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to LHS Connect Admin</h3>
            <div class="">
                <ValidatedInput
                    id="email"
                    label="Email"
                    required
                    pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                    {showValidation}
                    bind:value={formValues.email}
                    bind:isValid={formIsValid.email}
                    inputProps={{ type: 'email', placeholder: 'email@website.com' }}
                />
            </div>
            <div class="">
                <ValidatedInput
                    id="password"
                    label="Password"
                    required
                    {showValidation}
                    bind:value={formValues.password}
                    bind:isValid={formIsValid.password}
                    inputProps={{ type: 'password', placeholder: 'Password' }}
                />
            </div>
            <div class="flex items-start">
                <Checkbox id="remember">Remember Me</Checkbox>
                <button class="inline ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500"> Forgot Password? </button>
            </div>
            <Button type="submit" class="w-full">Login to your account</Button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500"> Create account </a>
            </div>
        </form>
    </Card>
</div>