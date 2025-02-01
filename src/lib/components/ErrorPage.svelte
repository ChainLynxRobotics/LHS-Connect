<script lang="ts">
	import { page } from '$app/stores';
	import ErrorCard from '$components/ErrorCard.svelte';
	import { A } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>LHS Connect | Error</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<div class="flex w-full flex-col flex-wrap items-center p-4 pb-16 pt-16">
		<ErrorCard status={$page.status} error={$page.error} />

        <div class="mt-8 text-gray-500 dark:text-gray-500 italic text-center">
			If you are looking for a shortened URL, try clicking <A href={"/link"+$page.url.pathname} class="">here</A>. <br />
			If that doesn't work, double check the URL you entered, and if you think its correct, contact the person who sent it to you.
		</div>
	</div>
</div>
