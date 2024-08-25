<script lang="ts">
	import { createQrPngDataUrl, createQrSvgDataUrl } from '@svelte-put/qr';
	import { qr, type ImgQRParameter } from '@svelte-put/qr/img';
	import { Button, Card, Select, Toggle, type SelectOptionType } from 'flowbite-svelte';

	/**
	 * The data for the QR code
	 */
	export let data: string;
	$: debounce(data);

	let debouncedData = data;

	let timer: number;
	const debounce = (data: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			debouncedData = data;
		}, 500);
	};

	let transparent = false;
	let dark = false;
	$: fillColor = !dark ? '#000000' : '#ffffff';
	$: backgroundFillColor = transparent ? 'transparent' : !dark ? '#ffffff' : '#000000';

	let qrConfig: ImgQRParameter;
	$: qrConfig = {
		data: debouncedData,
		width: 512,
		height: 512,
		margin: 1,
		moduleFill: fillColor,
		anchorInnerFill: fillColor,
		anchorOuterFill: fillColor,
		backgroundFill: backgroundFillColor
	};

	let downloadType = 'png';
	const downloadTypes: SelectOptionType<string>[] = [
		{ value: 'png', name: 'PNG' },
		{ value: 'svg', name: 'SVG' }
	];

	async function copyImage() {
		let dataUrl = await createQrPngDataUrl({ ...qrConfig, data }); // Use the non-debounced data
		let res = await fetch(dataUrl);
		let blob = await res.blob();

		await navigator.clipboard.write([
			new ClipboardItem({
				[blob.type]: blob
			})
		]);
	}

	function downloadURI(uri: string, name: string) {
		var link = document.createElement('a');
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	async function downloadQr() {
		if (downloadType === 'png') {
			let dataUrl = await createQrPngDataUrl({ ...qrConfig, data }); // Use the non-debounced data
			downloadURI(dataUrl, 'qr-code.png');
		} else if (downloadType === 'svg') {
			let dataUrl = await createQrSvgDataUrl({ ...qrConfig, data }); // Use the non-debounced data
			downloadURI(dataUrl, 'qr-code.svg');
		}
	}
</script>

<Card size="xs">
	<img use:qr={qrConfig} width="512" height="512" alt="QR Code" />
	<div class="flex w-full flex-col gap-2 py-4">
		<Toggle bind:checked={transparent}>Transparent</Toggle>
		<Toggle bind:checked={dark}>Dark Mode</Toggle>
		<Button
			on:click={copyImage}
			color="alternative"
			size="xs"
			title="Copy PNG image of this qr code">Copy Image</Button
		>
		<div class="grid grid-cols-[2fr,1fr] gap-2">
			<Button on:click={downloadQr} title="Download PNG or SVG of this qr code">Download</Button>
			<Select bind:value={downloadType} items={downloadTypes} placeholder="" />
		</div>
	</div>
</Card>
