<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import CrudList from '$components/admin/CRUDList.svelte';
	import { Button } from 'flowbite-svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';
	import EditableNote from './EditableNote.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-lg">
		<SectionHeader title="Bulletin Board" updatedAt={data.results} />
		<p class="mb-8">The title and content support markdown, and you can drag the notes around.</p>
		<CrudList
			serviceId="bulletinBoardNotes"
			items={data.results}
			generateNewItem={() => ({ title: 'New Note', content: 'content' })}
			canReorder
			initialOrder={data.results.map((note) => note.id)}
		>
			{#snippet renderItems({ items, create, reorder })}
				<div class="mb-8 flex justify-center">
					<Button color="alternative" on:click={create}>Add Note</Button>
				</div>
				<DraggableList
					dragZoneType="notes"
					{items}
					updateOrder={reorder}
					sectionClass="flex max-w-lg flex-col gap-4 py-4 mx-auto"
					dragWrapperClass="w-full"
				>
					{#snippet item({ item, update, duplicate, remove })}
						<EditableNote note={item} onUpdate={update} onDuplicate={duplicate} onRemove={remove} />
					{/snippet}
				</DraggableList>
			{/snippet}
		</CrudList>
	</div>
</div>
