<script lang="ts">
	import { A, Button, Card } from "flowbite-svelte";
	import { ArrowRightOutline } from "flowbite-svelte-icons";

    export let status: number;
    export let error: App.Error|null;
</script>

<Card size="md">
    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Oh my goodness gracious...</h5>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        You've encountered an error! If this is unexpected, please <A href="/about?type=bug#contact">contact us</A>!
    </p>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Status: <code>{status}</code>
        {#if error?.message}
            <br />
            Message: <code>{error.message}</code>
        {/if}
    </p>
    <Button href="/" class="w-fit mt-4">
        Return to Home <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
    </Button>
</Card>