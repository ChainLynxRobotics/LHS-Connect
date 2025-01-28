<script lang="ts">
	import { invalidate } from "$app/navigation";
	import FileDropzone from "$components/form/FileDropzone.svelte";
	import { getNotificationContext } from "$components/NotificationProvider.svelte";
    import QrCodeCard from "$components/QrCodeCard.svelte";
	import type { CloudFile, LocalFile } from "$lib/types/FileTransferData";
	import { BASE_API_URL } from "$lib/util/apiClient";
	import formatFileSize from "$lib/util/formatFileSize";
	import { Button, Progressbar, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
	import type { ChangeEventHandler } from "svelte/elements";
    import { PUBLIC_BASE_SHORT_URL } from "$env/static/public";

    interface Props {
        code: string;
        cloudFiles: CloudFile[];
    }

    const { code, cloudFiles: uploadedFiles }: Props = $props();

    const notificationContext = getNotificationContext();

    const sortedFiles = $derived(uploadedFiles.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));
    let localFileQueue: LocalFile[] = $state([]);
    let isUploading = $state(false);

    function updateFiles() {
        invalidate(`${BASE_API_URL}/fileTransfer/${code}/files`);
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.currentTarget.files) return;
        const files = [...event.currentTarget.files];

        let filesToQueue: LocalFile[] = files.map((file) => ({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
            uploadedAt: Date.now(),
            localFile: file,
            uploadProgress: 0,
        })).filter((file) => file.size <= 100 * 1024 * 1024);

        if (filesToQueue.length !== files.length) {
            notificationContext.show("Some files were too large to upload (Max 100MB)", "error");
        }

        localFileQueue = [...localFileQueue, ...filesToQueue];
        
        queueUpload();
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
            notificationContext.show("Failed to upload "+file.name, "error");
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
                    notificationContext.show("Uploaded "+file.name, "success");
                } else {
                    try {
                        const body = JSON.parse(req.responseText);
                        notificationContext.show("Failed to upload "+file.name+": "+body.message, "error");
                    } catch (e) {
                        console.error('Failed to parse response body', e);
                        notificationContext.show("Failed to upload "+file.name, "error");
                    }
                }
            }
        };
        req.open("POST", `${BASE_API_URL}/fileTransfer/${code}/files?name=${encodeURIComponent(file.name)}`, true);
        req.send(file.localFile);
    }
</script>

<div class="flex w-full flex-col items-center lg:items-start justify-center gap-8 lg:flex-row">
    <QrCodeCard data={new URL(`/files/${code}`, PUBLIC_BASE_SHORT_URL).toString()} 
        showLink 
        linkLabel="Share Link:" 
        linkHelper="Share this room link with other devices to transfer both ways"
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
                        <TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium"><div class="truncate max-w-32 sm:max-w-sm">{file.name}</div></TableBodyCell>
                        <TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">{formatFileSize(file.size)}</TableBodyCell>
                        <TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">
                            <Progressbar progress={file.uploadProgress * 100} />
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
                {#each sortedFiles as file (file.id)}
                    <TableBodyRow>
                        <TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">{file.name}</TableBodyCell>
                        <TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">{formatFileSize(file.size)}</TableBodyCell>
                        <TableBodyCell tdClass="px-3 py-4 whitespace-nowrap font-medium">
                            <Button href={`${BASE_API_URL}/fileTransfer/${code}/files/${file.id}`} download={file.name}>Download</Button>
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
        <div class="w-full mt-4 text-center text-sm italic text-gray-700 dark:text-gray-400">Files expire after 15 minutes</div>
    </div>
</div>

<div class="w-full mt-16 text-center text-sm italic text-gray-700 dark:text-gray-400">
    <p>Warning: Do not upload sensitive or personal files. Uploaded files are not encrypted on the server and can be accessed by anyone with the link.</p>
    <p>If you don't see your files, make sure both devices have the same URL and refresh the page. If you encounter other errors, please <a href="/about?type=bug#contact" class="underline">tell us!</a></p>
</div>