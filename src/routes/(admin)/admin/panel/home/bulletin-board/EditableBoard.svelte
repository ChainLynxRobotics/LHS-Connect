<script lang="ts">
	import type { Note } from '$lib/types/HomePageData';
	import EditableNote from './EditableNote.svelte';
	import { Button } from 'flowbite-svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';

	export let notes: Note[];

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
		notes.splice(index, 1);
		notes = notes; // Force update
	}
</script>

<div class="flex flex-col items-center">
	<Button color="alternative" on:click={handleNew}>New Note</Button>

	<DraggableList
		dragZoneType="notes"
		items={notes}
		update={(items) => (notes = items)}
		sectionClass="flex max-w-lg flex-col gap-4 py-4"
		dragWrapperClass="w-full"
		let:item
		let:index
	>
		<EditableNote
			note={item}
			on:edit={(e) => handleEdit(index, e.detail)}
			on:duplicate={() => handleDuplicate(index)}
			on:delete={() => handleDelete(index)}
		/>
	</DraggableList>
</div>
