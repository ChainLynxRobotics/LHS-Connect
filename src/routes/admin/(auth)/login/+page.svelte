<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { GoogleSolid, LockSolid } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>LHS Connect Admin | Login</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pt-16">
	<Card class="flex flex-col items-center">
		<LockSolid class="mb-4 h-16 w-16" />
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">LHS Connect Admin</h3>
		<p class="mb-8 text-gray-500 dark:text-gray-400">Sign in to continue</p>
		<Button href="/admin/login/google" color="light" shadow class="w-full cursor-pointer">
			<GoogleSolid class="me-2 h-5 w-5" />
			Sign in with Google
		</Button>
	</Card>
</div>
