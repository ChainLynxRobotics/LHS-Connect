<script lang="ts">
	import type { Note } from '$lib/types/HomePageData';
	import EditableNote from './EditableNote.svelte';
	import { Button } from 'flowbite-svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';

	interface Props {
		notes: Note[];
	}

	let { notes = $bindable([]) }: Props = $props();

	//////////////// Editing //////////////////

	function handleNew() {
		notes.push({
			title: 'New Note',
			content: 'content'
		});
		notes = notes; // Force update
	}

	function handleEdit(index: number, note: Note) {
		notes[index] = note;
	}

	function handleDuplicate(index: number) {
		notes.splice(index, 0, JSON.parse(JSON.stringify(notes[index])));
		notes = notes; // Force update
	}

	function handleDelete(index: number) {
		console.log('delete', index);
		notes.splice(index, 1);
		notes = notes; // Force update
	}
</script>

<div class="w-full">
	<div class="mb-8 flex justify-center">
		<Button color="alternative" on:click={handleNew}>Add Note</Button>
	</div>

	<DraggableList
		dragZoneType="notes"
		items={notes}
		update={(items) => (notes = items)}
		sectionClass="flex max-w-lg flex-col gap-4 py-4 mx-auto"
		dragWrapperClass="w-full"
	>
		{#snippet children({ item, index })}
			<EditableNote
				note={item}
				onEdit={(e) => handleEdit(index, e)}
				onDuplicate={() => handleDuplicate(index)}
				onDelete={() => handleDelete(index)}
			/>
		{/snippet}
	</DraggableList>
</div>
