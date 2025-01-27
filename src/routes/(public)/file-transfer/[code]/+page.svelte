<script lang="ts">
	import ComingSoon from '$components/ComingSoon.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { PageData } from './$types';
	import FileTransfer from './FileTransfer.svelte';

	interface Props {
		data: PageData
	}

	const { data }: Props = $props();
</script>

<svelte:head>
	<title>LHS Connect | File Transfer</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div class="w-full max-w-4xl">
		<SectionHeader title="File Transfer" />
		<p class="mb-12 mt-4 indent-8">
			Anybody with this link can upload files to this "room" and download any other devices files. 
			For example, you could open this on a computer, scan the QR code with your phone, and then upload 
			files from your phone to be downloaded on the computer. Files expire after 15 minutes.
		</p>

		<FileTransfer code={data.code} />
	</div>
</div>
