<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import EditableItemList from '$components/admin/EditableItemList.svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import BoardNoteContent from '$components/info/BoardNoteContent.svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import EditableNoteForm from './EditableNoteForm.svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';
	import ExternalLink from '$components/ExternalLink.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Bulletin Board" updatedAt={data.bulletinBoardNotes} />
		<p class="mb-8">The title and content support markdown, and you can drag the notes around. To learn more about markdown syntax <ExternalLink href="https://www.markdownguide.org/basic-syntax/" text="click here" />.</p>
		<EditableItemList
			serviceId="bulletinBoardNotes"
			items={data.bulletinBoardNotes}
			generateNewItem={() => ({ title: 'New Note', content: 'content' })}
			order={{ 
				canReorder: true,
			}}
		>
			{#snippet renderItems({ items, openCreateForm, reorder })}
				<div class="mb-8 flex justify-center">
					<Button color="alternative" on:click={openCreateForm}>Add Note</Button>
				</div>
				<DraggableList
					dragZoneType="bulletinBoardNotes"
					{items}
					{reorder}
					class="flex max-w-lg flex-col gap-4 py-4 mx-auto"
					wrapperElement="div"
					wrapperProps={{ class: 'flex w-full items-start gap-2' }}
				>
					{#snippet renderItem({ item, openEditFrom, duplicate, remove })}
						<div use:dragHandle class="w-full">
							<BoardNoteContent note={item} />
						</div>
						<div class="flex flex-col">
							<button title="Edit" onclick={openEditFrom} class="!p-2">
								<EditOutline class="h-6 w-6" />
							</button>
							<button title="Duplicate" onclick={duplicate} class="!p-2">
								<FileCopyOutline class="h-6 w-6" />
							</button>
							<button title="Delete" onclick={remove} class="!p-2">
								<TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" />
							</button>
						</div>
					{/snippet}
				</DraggableList>
			{/snippet}

			{#snippet editForm({ item, onSubmit, onCancel })}
				<Modal open size="md" autoclose={false} on:close={onCancel}>
					<EditableNoteForm note={item} {onSubmit} {onCancel} />
				</Modal>
			{/snippet}
		</EditableItemList>
	</div>
</div>
