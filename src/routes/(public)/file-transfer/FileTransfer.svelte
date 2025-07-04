<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import FileDropzone from '$components/form/FileDropzone.svelte';
	import { getNotificationContext } from '$components/NotificationProvider.svelte';
	import QrCodeCard from '$components/QrCodeCard.svelte';
	import apiRequest, { BASE_API_URL } from '$lib/util/apiClient';
	import formatFileSize from '$lib/util/formatFileSize';
	import {
		Button,
		ButtonGroup,
		Helper,
		Hr,
		Input,
		Label,
		Progressbar,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
	} from 'flowbite-svelte';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { PUBLIC_BASE_SHORT_URL } from '$env/static/public';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { nanoid } from 'nanoid';
	import saveAs from '$lib/util/saveAs';
	import type { IUploadedFile, ILocalFile } from '$api/file_transfer/types';

	interface Props {
		code: string;
		uploadedFiles: IUploadedFile[];
	}

	const { code, uploadedFiles }: Props = $props();

	const notificationContext = getNotificationContext();

	let roomCodeInput = $state<string>('');
	let roomCodeInputError = $state<string>('');

	const handleRoomCodeCheck = () => {
		let input = roomCodeInput + '';
		input = input.trim().replace(/[^0-9]/g, '');
		if (input.length !== 8) {
			roomCodeInputError = 'Room code must be 8 digits';
			return;
		}
		input = input.substring(0, 4) + '-' + input.substring(4, 8);
		if (input === code) {
			roomCodeInputError = 'You are already in this room!';
			return;
		}
		roomCodeInputError = '';
		return input;
	};

	const handleRoomCodeSubmit = (event: Event) => {
		event.preventDefault();
		let input = handleRoomCodeCheck();
		if (!input) return;
		goto(`?code=${input}`);
		roomCodeInput = '';
		roomCodeInputError = '';
		notificationContext.show('Room changed to ' + input, 'success');
	};

	const sortedFiles = $derived(
		uploadedFiles
			.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
			.filter(
				(file) =>
					localFileQueue.findIndex((f) => f.name === file.name && f.size == file.size) === -1
			) // Exclude files that are already in the local queue (cant use id since they are not uploaded yet)
	);
	let localFileQueue: ILocalFile[] = $state([]);
	let isUploading = $state(false);

	function updateFiles() {
		invalidate(`${BASE_API_URL}/file_transfer/${code}/files`);
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (!event.currentTarget.files) return;
		const files = [...event.currentTarget.files];

		for (const file of files) {
			if (file.size > 100 * 1024 * 1024) {
				notificationContext.show('File too large: ' + file.name + ' (Max 100MB)', 'error');
				return;
			}

			apiRequest('POST', `/file_transfer/${code}/files`, { name: file.name, size: file.size })
				.then((res) => {
					const localFile: ILocalFile = {
						id: nanoid(),
						name: file.name,
						size: file.size,
						file,
						uploadProgress: 0,
						uploadUrl: res.uploadUrl,
					};

					localFileQueue.push(localFile);
					localFileQueue = localFileQueue; // Trigger reactivity
					queueUpload();
				})
				.catch((error) => {
					console.error('Error getting upload URL for', file.name, error);
					notificationContext.show('Error uploading file ' + file.name, 'error');
				});
		}
	};

	function queueUpload() {
		if (isUploading) return;
		if (localFileQueue.length === 0) return;

		const file = localFileQueue[0];
		if (!file) return;

		isUploading = true;
		let req = new XMLHttpRequest();
		req.upload.onprogress = (event) => {
			file.uploadProgress = event.loaded / event.total;
			console.log('Upload progress', file.uploadProgress);
		};
		req.upload.onerror = (event) => {
			console.error('Upload error', event);
			notificationContext.show('Failed to upload ' + file.name, 'error');
		};
		req.upload.onloadend = (event) => {
			file.uploadProgress = event.loaded / event.total;
			localFileQueue.shift();
			updateFiles();
			isUploading = false;
			queueUpload();
		};
		req.onreadystatechange = () => {
			if (req.readyState === 4) {
				if (req.status === 200) {
					notificationContext.show('Uploaded ' + file.name, 'success');
				} else {
					notificationContext.show('Failed to upload ' + file.name, 'error');
					console.error('Upload failed', req.responseText);
				}
			}
		};
		req.open('PUT', file.uploadUrl, true);
		req.send(file.file);
	}

	$effect(() => {
		const interval = setInterval(updateFiles, 5000); // Update every 5 seconds
		return () => clearInterval(interval);
	});
</script>

<div class="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
	{#snippet headerSnippet()}
		<Label>This room's code:</Label>
		<div class="ps-2 text-2xl font-bold tracking-wider">{code}</div>

		<form onsubmit={handleRoomCodeSubmit}>
			<ButtonGroup class="mt-4 w-full">
				<Input
					bind:value={roomCodeInput}
					oninput={() => (roomCodeInputError = '')}
					color={roomCodeInputError ? 'red' : 'base'}
					id="room-code"
					type="text"
					placeholder="Other room code"
				/>
				<Button type="submit" color="primary" class="p-2!">
					<ArrowRightOutline class="h-5 w-5" />
				</Button>
			</ButtonGroup>
			{#if roomCodeInputError}
				<Helper class="mt-2" color="red">
					{roomCodeInputError}
				</Helper>
			{/if}
		</form>

		<Hr classHr="my-8 w-full" textSpanClass="bg-white dark:bg-gray-800">OR</Hr>
	{/snippet}
	<QrCodeCard
		data={new URL(`/files?code=${code}`, PUBLIC_BASE_SHORT_URL).toString()}
		{headerSnippet}
		showLink
		linkLabel="Share Link:"
		showSaveOptions={false}
	/>
	<div class="w-full">
		<FileDropzone multiple onchange={handleChange} helperText="Any file type (Max 100MB)" />

		<Table shadow class="mt-8 flex-grow-0">
			<TableHead>
				<TableHeadCell class="w-full">Name</TableHeadCell>
				<TableHeadCell>Size</TableHeadCell>
				<TableHeadCell class="min-w-32">Actions</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each localFileQueue as file (file.id)}
					<TableBodyRow>
						<TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium"
							><div class="max-w-32 truncate sm:max-w-sm">{file.name}</div></TableBodyCell
						>
						<TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium"
							>{formatFileSize(file.size)}</TableBodyCell
						>
						<TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">
							<Progressbar progress={file.uploadProgress * 100} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
				{#each sortedFiles as file (file.id)}
					<TableBodyRow>
						<TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium"
							>{file.name}</TableBodyCell
						>
						<TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium"
							>{formatFileSize(file.size)}</TableBodyCell
						>
						<TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">
							<Button onclick={() => saveAs(file.url, file.name)}>Download</Button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
				{#if uploadedFiles.length === 0 && localFileQueue.length === 0}
					<TableBodyRow>
						<TableBodyCell colspan={3} class="text-center">No files uploaded yet</TableBodyCell>
					</TableBodyRow>
				{/if}
			</TableBody>
		</Table>
		<div class="mt-4 w-full text-center text-sm italic text-gray-700 dark:text-gray-400">
			Files expire after 15 minutes
		</div>
	</div>
</div>

<div class="mt-16 w-full text-center text-sm italic text-gray-700 dark:text-gray-400">
	<p>
		Warning: Do not upload sensitive or personal files. Uploaded files are not encrypted on the
		server and can be accessed by anyone with the link.
	</p>
	<p>
		If you don't see your files, make sure both devices have the same URL and refresh the page. If
		you encounter other errors, please <a href="/about?type=bug#contact" class="underline"
			>tell us!</a
		>
	</p>
</div>
