<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';

    export let form;
</script>

<svelte:head>
	<title>LHS Connect | Link Generator</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Link Editor" />
		<p class="mb-12 mt-4 indent-8">
			If you already created a short link, you can edit it here. Just paste the short link in the box below with its password and click "Edit" to proceed.
		</p>

		
	</div>
</div>
