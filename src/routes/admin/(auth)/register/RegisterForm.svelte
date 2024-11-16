<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import adminRegisterSchema from '$lib/validation/adminRegisterSchema';
	import { Button, Checkbox, Helper } from 'flowbite-svelte';

	let form: HTMLFormElement | undefined = $state();

	let emailInput: ValidatedInput<'email'> | undefined = $state();
	let passwordInput: ValidatedInput<'password'> | undefined = $state();
	let confirmPasswordInput: ValidatedInput<'confirmPassword'> | undefined = $state();
	let keyInput: ValidatedInput<'key'> | undefined = $state();

	let isSubmitting = false;
	async function onsubmit(event: Event) {
		event.preventDefault();
		if (isSubmitting) return;
		isSubmitting = true;

		const loginData = {
			email: await emailInput!.validate(),
			password: await passwordInput!.validate(),
			confirmPassword: await confirmPasswordInput!.validate(),
			key: await keyInput!.validate()
		};
		console.log(loginData);
		alert('TODO');
	}
</script>

<form bind:this={form} {onsubmit} class="flex flex-col space-y-6">
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">
		Register an LHS Connect Admin account
	</h3>
	<div class="">
		<ValidatedInput
			bind:this={emailInput}
			id="email"
			label="Email"
			visuallyRequired
			validatorObject={adminRegisterSchema}
			inputProps={{ type: 'email' }}
		/>
	</div>
	<div class="">
		<ValidatedInput
			bind:this={passwordInput}
			id="password"
			label="Password"
			visuallyRequired
			validatorObject={adminRegisterSchema}
			inputProps={{ type: 'password' }}
		/>
	</div>
	<div class="">
		<ValidatedInput
			bind:this={confirmPasswordInput}
			id="confirmPassword"
			label="Confirm Password"
			visuallyRequired
			validatorObject={adminRegisterSchema}
			inputProps={{ type: 'password' }}
		/>
	</div>
	<div class="">
		<ValidatedInput
			bind:this={keyInput}
			id="key"
			label="Admin Account Key"
			visuallyRequired
			validatorObject={adminRegisterSchema}
			inputProps={{ type: 'password' }}
		/>
		<Helper>
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
				This key is provided by the LHS Connect team to verify your identity.
			</p>
		</Helper>
	</div>
	<div class="flex items-start">
		<Checkbox id="remember" name="remember">Remember Me</Checkbox>
	</div>
	<Button type="submit" class="w-full">Login to your account</Button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Already registered? <a
			href="/admin/login"
			class="text-primary-700 hover:underline dark:text-primary-500"
		>
			Log In
		</a>
	</div>
</form>
