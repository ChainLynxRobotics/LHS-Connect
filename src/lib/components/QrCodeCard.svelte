<script lang="ts">
	import { createQrPngDataUrl, createQrSvgDataUrl } from '@svelte-put/qr';
	import { qr, type ImgQRParameter } from '@svelte-put/qr/img';
	import { Button, ButtonGroup, Card, Hr, Input, Label, Select, Toggle, Tooltip, type SelectOptionType } from 'flowbite-svelte';
	import { CheckOutline, FileCopyOutline } from 'flowbite-svelte-icons';
	import { scale } from 'svelte/transition';

	interface Props {
		/**
		 * The data for the QR code
		 */
		data: string;
		/**
		 * Whether to show the original link above the QR code
		 */
		showLink?: boolean;
	}

	let { data, showLink }: Props = $props();

	let debouncedData = $state(data);

	let timer: NodeJS.Timeout;
	const debounce = (data: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			debouncedData = data;
		}, 500);
	};
	$effect(() => debounce(data));

	let transparent = $state(false);
	let dark = $state(false);

	let fillColor = $derived(!dark ? '#000000' : '#ffffff');
	let backgroundFillColor = $derived(transparent ? 'transparent' : !dark ? '#ffffff' : '#000000');

	let linkCopied = $state(false);
	$effect(() => {
		if (linkCopied) {
			setTimeout(() => {
				linkCopied = false;
			}, 1000);
		}
	});

	let qrConfig: ImgQRParameter = $derived({
		data: debouncedData,
		width: 512,
		height: 512,
		margin: 1,
		moduleFill: fillColor,
		anchorInnerFill: fillColor,
		anchorOuterFill: fillColor,
		backgroundFill: backgroundFillColor
	});

	let downloadType = $state('png');
	const downloadTypes: SelectOptionType<string>[] = [
		{ value: 'png', name: 'PNG' },
		{ value: 'svg', name: 'SVG' }
	];

	async function copyLink() {
		await navigator.clipboard.writeText(data);
		linkCopied = true;
	}

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
	{#if showLink}
		<Label class="mb-2" for="generated-link">Your Link:</Label>
		<ButtonGroup class="w-full" size="md">
			<Input id="generated-link" type="text" value={data} readonly class="!border-gray-300 dark:!border-gray-500 !ring-0" />
			<Button color="alternative" class="!p-2" onclick={copyLink} title="Copy link to clipboard">
				<div class="relative w-6 h-6">
					{#if linkCopied}
						<div transition:scale={{duration: 200}}>
							<CheckOutline class="absolute w-6 h-6" />
						</div>
					{:else}
						<div transition:scale={{duration: 200}}>
							<FileCopyOutline class="absolute w-6 h-6" />
						</div>
					{/if}
				</div>
			</Button>
			<Tooltip>Copy link to clipboard</Tooltip>
		</ButtonGroup>
		<Hr />
	{/if}
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
