<script lang="ts">
	import bulletinBoard from '$lib/fake_data/bulletinBoard';
	import type { BulletinBoardData, Note } from '$lib/types/HomePageData';
	import EditableBoardNoteContent from './EditableBoardNoteContent.svelte';
	import { Button, Helper, Modal } from 'flowbite-svelte';
	import { createHistoryManager } from '$lib/util/clientHistoryManager';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import bulletinBoardSchema from '$lib/schemas/bulletinBoardSchema';
	import { tick } from 'svelte';
	import UndoRedoPublishBar from '$components/admin/UndoRedoPublishBar.svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';

	export let bulletinBoardData: BulletinBoardData = bulletinBoard; // TODO: Replace with real data

	const { state, undo, redo, canUndo, canRedo } = createHistoryManager(bulletinBoardData);

	//////////////// Editing //////////////////

	function handleNew() {
		$state.notes = [
			...$state.notes,
			{
				title: 'New Note',
				content: 'content'
			}
		];
	}

	function handleDuplicate(index: number) {
		const note = $state.notes[index];
		if (!note) return;
		$state.notes = [
			...$state.notes,
			{
				title: note.title,
				content: note.content,
				link: note.link
			}
		];
	}

	function handleDelete(index: number) {
		$state.notes.splice(index, 1);
		$state = $state; // Force update
	}

	//////////////// Editing Modal //////////////////

	let editModalOpen = false;
	let editModalIndex = 0;
	let editModalNote: Note | undefined = undefined;

	let titleInput: ValidatedInput<'title'>;
	let contentInput: ValidatedTextarea<'content'>;
	let linkInput: ValidatedInput<'link'>;

	function openEditModal(index: number) {
		editModalOpen = true;
		editModalIndex = index;
		editModalNote = $state.notes[index];

		tick().then(() => {
			titleInput.value = editModalNote?.title;
			contentInput.value = editModalNote?.content;
			linkInput.value = editModalNote?.link;
		});
	}

	function handleEditModalSubmit(e: SubmitEvent) {
		e.preventDefault();
		(async () => {
			if (
				[
					await titleInput.validate(),
					await contentInput.validate(),
					await linkInput.validate()
				].every((v) => v)
			) {
				const note = {
					title: titleInput.value || '',
					content: contentInput.value || '',
					link: linkInput.value
				};
				$state.notes[editModalIndex] = note;
				editModalOpen = false;
			}
		})();
	}
</script>

<Button color="alternative" on:click={handleNew}>New Note</Button>

<DraggableList
	items={$state.notes}
	sectionClass="flex max-w-lg flex-col gap-4 py-4"
	dragWrapperClass="w-full"
	let:item
	let:index
>
	<EditableBoardNoteContent
		note={item}
		on:editButtonClick={() => openEditModal(index)}
		on:duplicateButtonClick={() => handleDuplicate(index)}
		on:deleteButtonClick={() => handleDelete(index)}
	/>
</DraggableList>

<UndoRedoPublishBar
	canUndo={$canUndo}
	canRedo={$canRedo}
	canPublish={$canUndo}
	on:undo={undo}
	on:redo={redo}
	on:publish={() => alert('TODO')}
/>

<Modal bind:open={editModalOpen} size="md" autoclose={false}>
	<form class="flex flex-col space-y-6" action="#" on:submit={handleEditModalSubmit}>
		<div>
			<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Note</h3>
			<Helper>Markdown is supported</Helper>
		</div>
		<div>
			<ValidatedInput
				bind:this={titleInput}
				id="title"
				label="Title"
				validatorObject={bulletinBoardSchema}
				visuallyRequired
			/>
		</div>
		<div>
			<ValidatedTextarea
				bind:this={contentInput}
				id="content"
				label="Content"
				validatorObject={bulletinBoardSchema}
				visuallyRequired
			/>
		</div>
		<div>
			<ValidatedInput
				bind:this={linkInput}
				id="link"
				validatorObject={bulletinBoardSchema}
				label="Link"
			/>
		</div>
		<div class="flex gap-4">
			<Button type="button" color="alternative" on:click={() => (editModalOpen = false)}
				>Cancel</Button
			>
			<Button type="submit">Save</Button>
		</div>
	</form>
</Modal>
