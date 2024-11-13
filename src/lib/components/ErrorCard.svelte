<script lang="ts">
	import { A, Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	interface Props {
		status: number;
		error?: App.Error | null;
	}

	let { status, error }: Props = $props();
</script>

<Card size="md">
	<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
		Oh my goodness gracious...
	</h5>
	<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
		You've encountered an error! If this is unexpected, please <A href="/about?type=bug#contact"
			>contact us</A
		>!
	</p>
	<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
		Status: <code>{status}</code>
		{#if error?.message}
			<br />
			Message: <code>{error.message}</code>
		{/if}
	</p>
	<Button href="/" class="mt-4 w-fit">
		Return to Home <ArrowRightOutline class="ms-2 h-6 w-6 text-white" />
	</Button>
</Card>
