<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import adminLoginSchema from "$lib/schemas/adminLoginSchema";
    import { Button, Card, Checkbox, Modal } from "flowbite-svelte";

    let form: HTMLFormElement;

    let email: ValidatedInput<"email">;

    let isSubmitting = false;
    function handleSubmit(event: SubmitEvent) {
        if (isSubmitting) return;
        isSubmitting = true;
        event.preventDefault();

        Promise.all([
            email.validate()
        ]).then((results) => {
            if (results.every((result) => result)) {
                // All fields are valid
                form.submit();
            }
        }).finally(() => {
            isSubmitting = false;
        });
    }
    
</script>

<svelte:head>
	<title>LHS Connect Admin | Login</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pt-16">

    <Card>
        <form bind:this={form} on:submit={handleSubmit} method="post" class="flex flex-col space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to LHS Connect Admin</h3>
            <div class="">
                <ValidatedInput
                    bind:this={email}
                    id="email"
                    label="Email"
                    validatorObject={adminLoginSchema}
                    inputProps={{ type: 'email', placeholder: 'email@website.com' }}
                />
            </div>
            <div class="">
                <ValidatedInput
                    id="password"
                    label="Password"
                    validatorObject={adminLoginSchema}
                    inputProps={{ type: 'password' }}
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