<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import adminRegisterSchema from "$lib/schemas/adminRegisterSchema";
    import { Button, Checkbox, Helper } from "flowbite-svelte";

    let form: HTMLFormElement;

    let email: ValidatedInput<"email">;
    let password: ValidatedInput<"password">;
    let confirmPassword: ValidatedInput<"confirmPassword">;
    let key: ValidatedInput<"key">;

    let isSubmitting = false;
    function handleSubmit(event: SubmitEvent) {
        if (isSubmitting) return;
        isSubmitting = true;
        event.preventDefault();

        Promise.allSettled([
            email.validate(true),
            password.validate(true),
        ]).then((results) => {
            if (results.every((result) => result.status === 'fulfilled' && result.value === true)) {
                // All fields are valid
                form.submit();
            }
        }).finally(() => {
            isSubmitting = false;
        });
    }
</script>

<form bind:this={form} on:submit={handleSubmit} method="post" novalidate class="flex flex-col space-y-6">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Register an LHS Connect Admin account</h3>
    <div class="">
        <ValidatedInput
            bind:this={email}
            id="email"
            label="Email"
            visuallyRequired
            validatorObject={adminRegisterSchema}
            inputProps={{ type: 'email' }}
        />
    </div>
    <div class="">
        <ValidatedInput
            bind:this={password}
            id="password"
            label="Password"
            visuallyRequired
            validatorObject={adminRegisterSchema}
            inputProps={{ type: 'password' }}
        />
    </div>
    <div class="">
        <ValidatedInput
            bind:this={confirmPassword}
            id="confirmPassword"
            label="Confirm Password"
            visuallyRequired
            validatorObject={adminRegisterSchema}
            inputProps={{ type: 'password' }}
        />
    </div>
    <div class="">
        <ValidatedInput
            bind:this={key}
            id="key"
            label="Admin Account Key"
            visuallyRequired
            validatorObject={adminRegisterSchema}
            inputProps={{ type: 'password' }}
        />
        <Helper>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">This key is provided by the LHS Connect team to verify your identity.</p>
        </Helper>
    </div>
    <div class="flex items-start">
        <Checkbox id="remember" name="remember">Remember Me</Checkbox>
    </div>
    <Button type="submit" class="w-full">Login to your account</Button>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered? <a href="/admin/login" class="text-primary-700 hover:underline dark:text-primary-500"> Log In </a>
    </div>
</form>

