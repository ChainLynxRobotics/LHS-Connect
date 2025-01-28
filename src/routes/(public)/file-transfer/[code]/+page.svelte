<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import FileTransfer from './FileTransfer.svelte';

	interface Props {
		data: PageData
	}

	const { data }: Props = $props();

	onMount(() => {
		localStorage.setItem('fileTransferCode', data.code);
	});
</script>

<svelte:head>
	<title>LHS Connect | File Transfer</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="File Transfer" />
		<div class="mb-8 mt-4 indent-8">
			<p class="mb-4">
				Upload files and share both ways by scanning the QR code or sharing the link. Devices on this link share a "room" and can upload and download files to and from each other.
			</p>
		</div>

		<FileTransfer code={data.code} cloudFiles={data.cloudFiles} />
	</div>
</div>
