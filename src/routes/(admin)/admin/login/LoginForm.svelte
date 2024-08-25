<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import adminLoginSchema from '$lib/schemas/adminLoginSchema';
	import { Button, Checkbox, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	let form: HTMLFormElement;

	let email: ValidatedInput<'email'>;
	let password: ValidatedInput<'password'>;

	let isSubmitting = false;
	function handleSubmit(event: SubmitEvent) {
		if (isSubmitting) return;
		isSubmitting = true;
		event.preventDefault();

		Promise.allSettled([email.validate(true), password.validate(true)])
			.then((results) => {
				if (results.every((result) => result.status === 'fulfilled' && result.value === true)) {
					// All fields are valid
					form.submit();
				}
			})
			.finally(() => {
				isSubmitting = false;
			});
	}

	let passwordInfoOpen = false;
</script>

<form
	bind:this={form}
	on:submit={handleSubmit}
	method="post"
	novalidate
	class="flex flex-col space-y-6"
>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to LHS Connect Admin</h3>
	<div class="">
		<ValidatedInput
			bind:this={email}
			id="email"
			label="Email"
			visuallyRequired
			validatorObject={adminLoginSchema}
			inputProps={{ type: 'email' }}
		/>
	</div>
	<div class="">
		<ValidatedInput
			bind:this={password}
			id="password"
			label="Password"
			visuallyRequired
			validatorObject={adminLoginSchema}
			inputProps={{ type: 'password' }}
		/>
	</div>
	<div class="flex items-start">
		<Checkbox id="remember" name="remember">Remember Me</Checkbox>
		<button
			type="button"
			on:click={() => (passwordInfoOpen = true)}
			class="ms-auto inline text-sm text-primary-700 hover:underline dark:text-primary-500"
		>
			Forgot Password?
		</button>
	</div>
	<Button type="submit" class="w-full">Login to your account</Button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Not registered? <a
			href="/admin/register"
			class="text-primary-700 hover:underline dark:text-primary-500"
		>
			Create account
		</a>
	</div>
</form>

<Modal bind:open={passwordInfoOpen} size="xs" autoclose outsideclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Please contact the site owner to reset your password
		</h3>
		<Button color="alternative">Ok</Button>
	</div>
</Modal>
