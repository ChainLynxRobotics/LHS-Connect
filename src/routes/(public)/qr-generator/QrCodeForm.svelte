<script lang="ts">
	import QrCodeCard from "$components/QrCodeCard.svelte";
	import { Input, Label } from "flowbite-svelte";

    let data = '';


</script>

<div class="flex w-full gap-8 flex-col items-center md:flex-row md:items-start">
        
    <div class="w-full mb-6">
        <Label for="qr-data" class="mb-2">QR Code Data</Label>
        <Input 
            type="text" 
            id="qr-data"
            placeholder="Paste URL or text here" 
            bind:value={data} 
        />
    </div>

    <QrCodeCard data={data} />
</div>