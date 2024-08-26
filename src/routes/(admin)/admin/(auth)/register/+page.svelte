<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import RegisterForm from './RegisterForm.svelte';
</script>

<svelte:head>
	<title>LHS Connect Admin | Register</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pt-16">
	<Card>
		<RegisterForm />
	</Card>
</div>
