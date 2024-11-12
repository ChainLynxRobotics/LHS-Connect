<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import adminLoginSchema from '$lib/schemas/adminLoginSchema';
	import { Button, Checkbox, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	let form: HTMLFormElement|undefined = $state();

	let emailInput: ValidatedInput<'email'>|undefined = $state();
	let passwordInput: ValidatedInput<'password'>|undefined = $state();

	let isSubmitting = false;
	async function onsubmit(event: Event) {
		event.preventDefault();
		if (isSubmitting) return;
		isSubmitting = true;

		const loginData = {
			email: await emailInput!.validate(),
			password: await passwordInput!.validate()
		};
		console.log(loginData);
		alert('TODO');
	}

	let passwordInfoOpen = $state(false);
</script>

<form
	bind:this={form}
	{onsubmit}
	method="post"
	novalidate
	class="flex flex-col space-y-6"
>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to LHS Connect Admin</h3>
	<div class="">
		<ValidatedInput
			bind:this={emailInput}
			id="email"
			label="Email"
			visuallyRequired
			validatorObject={adminLoginSchema}
			inputProps={{ type: 'email' }}
		/>
	</div>
	<div class="">
		<ValidatedInput
			bind:this={passwordInput}
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
			onclick={() => (passwordInfoOpen = true)}
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
