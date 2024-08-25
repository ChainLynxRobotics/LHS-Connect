<script lang="ts">
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import { Input, Label } from 'flowbite-svelte';

	let data = '';
</script>

<div class="flex w-full flex-col items-center gap-8 md:flex-row md:items-start">
	<div class="mb-6 w-full">
		<Label for="qr-data" class="mb-2">QR Code Data</Label>
		<Input type="text" id="qr-data" placeholder="Paste URL or text here" bind:value={data} />
	</div>

	<QrCodeCard {data} />
</div>
