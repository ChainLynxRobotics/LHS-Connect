<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import ShortLinkForm from './ShortLinkForm.svelte';
</script>

<svelte:head>
	<title>LHS Connect | Link Generator</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Link Generator" />
		<p class="mb-12 mt-4 indent-8">
			Take a long URL and shorten it to a more manageable and lincoln-branded link. This is useful
			for putting on posters or other advertising. Make sure to keep everything school appropriate!
			Already have a short link? <a href="/link-generator/edit" class="text-primary-500 underline"
				>Edit it here</a
			>!
		</p>

		<ShortLinkForm />
	</div>
</div>
