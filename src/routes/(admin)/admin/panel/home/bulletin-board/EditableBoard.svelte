<script lang="ts">
	import bulletinBoard from '$lib/fake_data/bulletinBoard';
	import type { BulletinBoardData, Note } from '$lib/types/HomePageData';
	import EditableBoardNoteContent from './EditableBoardNoteContent.svelte';
	import { Button, Helper, Modal } from 'flowbite-svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import bulletinBoardSchema from '$lib/schemas/bulletinBoardSchema';
	import { tick } from 'svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';

	export let bulletinBoardData: BulletinBoardData = bulletinBoard; // TODO: Replace with real data

	//////////////// Editing //////////////////

	function handleNew() {
		bulletinBoardData.notes = [
			...bulletinBoardData.notes,
			{
				title: 'New Note',
				content: 'content'
			}
		];
	}

	function handleDuplicate(index: number) {
		const note = bulletinBoardData.notes[index];
		if (!note) return;
		bulletinBoardData.notes = [
			...bulletinBoardData.notes,
			{
				title: note.title,
				content: note.content,
				link: note.link
			}
		];
	}

	function handleDelete(index: number) {
		bulletinBoardData.notes.splice(index, 1);
		bulletinBoardData = bulletinBoardData; // Force update
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
		editModalNote = bulletinBoardData.notes[index];

		tick().then(() => {
			titleInput.value = editModalNote?.title;
			contentInput.value = editModalNote?.content;
			linkInput.value = editModalNote?.link;
		});
	}

	async function handleEditModalSubmit(e: SubmitEvent) {
		if (
			![
				await titleInput.validate(),
				await contentInput.validate(),
				await linkInput.validate()
			].every((v) => v)
		) return;
		const note = {
			title: titleInput.value || '',
			content: contentInput.value || '',
			link: linkInput.value
		};
		bulletinBoardData.notes[editModalIndex] = note;
		bulletinBoardData = bulletinBoardData; // Force update
		editModalOpen = false;
	}
</script>

<Button color="alternative" on:click={handleNew}>New Note</Button>

<DraggableList
	items={bulletinBoardData.notes}
	update={(notes) => (bulletinBoardData.notes = notes)}
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

<Modal bind:open={editModalOpen} size="md" autoclose={false}>
	<form class="flex flex-col space-y-6" on:submit|preventDefault={handleEditModalSubmit}>
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
