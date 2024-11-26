<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components"
	import { Button, Card } from "flowbite-svelte";
	import { GoogleSolid, LockSolid } from "flowbite-svelte-icons";

</script>

<svelte:head>
	<title>LHS Connect Admin | Login</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pt-16">
	<Card class="flex flex-col items-center">
		<LockSolid class="w-16 h-16 mb-4" />
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">LHS Connect Admin</h3>
		<p class="text-gray-500 dark:text-gray-400 mb-8">Sign in to continue</p>
		<SignIn provider="google" signInPage="admin/login" className="my-6">
			<Button slot="submitButton" tag="label" color="light" shadow class="w-full cursor-pointer">
				<GoogleSolid class="w-5 h-5 me-2" />
				Sign in with Google
			</Button>
		</SignIn>
	</Card>
</div>
