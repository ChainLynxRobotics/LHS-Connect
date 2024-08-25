<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import LoginForm from './LoginForm.svelte';
</script>

<svelte:head>
	<title>LHS Connect Admin | Login</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pt-16">
	<Card>
		<LoginForm />
	</Card>
</div>
