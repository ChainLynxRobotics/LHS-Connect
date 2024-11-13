<script lang="ts">
	import { page } from '$app/stores';
	import ErrorCard from '$components/ErrorCard.svelte';
</script>

<svelte:head>
	<title>LHS Connect | Error</title>
</svelte:head>

<div class="flex w-full flex-col flex-wrap items-center p-4 pb-16 pt-16">
	<ErrorCard status={$page.status} error={$page.error} />
</div>
