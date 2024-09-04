<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import QrCodeForm from './QrCodeForm.svelte';
</script>

<svelte:head>
	<title>LHS Connect | QR Generator</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="QR Code Generator" />
		<p class="mb-12 mt-4 indent-8">
			Take any URL or text and generate a QR code for it. If you have a url that is too long to fit
			nicely on a qr code, check out the <a
				class="text-primary-400 underline"
				href="/link-generator">short link generator</a
			> to create a shorter link that redirects to your long url.
		</p>

		<QrCodeForm />
	</div>
</div>
