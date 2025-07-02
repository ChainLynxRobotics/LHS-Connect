<script lang="ts">
	import DraggableList from '$components/admin/DraggableList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import EditableItemList from '$components/admin/EditableItemList.svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import LinkCardContent from '$components/info/LinkCardContent.svelte';
	import { EditOutline, FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import EditableLinkCardForm from './EditableLinkCardForm.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Useful Links" updatedAt={data.usefulLinks} />
		<p class="mb-8">
			These links are rendered at the bottom of the page in a footer on all public pages
		</p>
		<EditableItemList
			serviceId="usefulLinks"
			items={data.usefulLinks}
			generateNewItem={() => ({
				title: 'New Card',
				links: [],
			})}
			order={{
				canReorder: true,
			}}
		>
			{#snippet renderItems({ items, openCreateForm, reorder })}
				<div class="mb-8 flex justify-center">
					<Button color="alternative" on:click={openCreateForm}>New Card</Button>
				</div>
				<DraggableList
					dragZoneType="cards"
					{items}
					{reorder}
					class="flex flex-col items-center gap-4 py-4"
					wrapperElement="div"
					wrapperProps={{ class: 'flex items-start gap-2' }}
				>
					{#snippet renderItem({ item, openEditFrom, duplicate, remove })}
						<div use:dragHandle>
							<LinkCardContent card={item} />
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
					<EditableLinkCardForm card={item} {onSubmit} {onCancel} />
				</Modal>
			{/snippet}
		</EditableItemList>
	</div>
</div>
