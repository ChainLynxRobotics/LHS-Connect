<script lang="ts">
	import bulletinBoard from '$lib/fake_data/bulletinBoard';
	import type { BulletinBoardData, Note } from '$lib/types/HomePageData';
	import { dragHandleZone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import EditableBoardNoteContent from './EditableBoardNoteContent.svelte';
	import { Button, Helper, Modal } from 'flowbite-svelte';
	import { createHistoryManager } from '$lib/util/clientHistoryManager';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import bulletinBoardSchema from '$lib/schemas/bulletinBoardSchema';
	import { tick } from 'svelte';
	import UndoRedoPublishBar from '$components/admin/UndoRedoPublishBar.svelte';

	export let bulletinBoardData: BulletinBoardData = bulletinBoard; // TODO: Replace with real data

	const { state, undo, redo, canUndo, canRedo } = createHistoryManager(
		// bulletinBoardData does NOT include an id param for each note, so we need to add it for dnd to work
		bulletinBoardData.notes.map((note, index) => ({
			id: index,
			data: note
		}))
	);

	// Unpack the dnd state to be used in the component output
	$: bulletinBoardData = { notes: $state.map((v) => v.data) }; // Update the data to be saved when the state changes

	//////////////// Drag and drop //////////////////

	$: visualState = $state; // Temp value for what is displayed during dragging. State is then updated once the drag is finalized.

	const flipDurationMs = 300;
	function handleDndConsider(e: CustomEvent<{ items: { id: number; data: Note }[] }>) {
		visualState = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<{ items: { id: number; data: Note }[] }>) {
		visualState = e.detail.items;
		// Check if order has changed before updating state and history
		if (e.detail.items.map((v) => v.id).join(',') !== $state.map((v) => v.id).join(',')) {
			$state = e.detail.items; // Update the actual state now that its finalized
		}
	}

	//////////////// Editing //////////////////

	/**
	 * Grab the highest id and then plus 1
	 */
	function newId() {
		return $state.reduce((prev, current) => (prev && prev.id > current.id ? prev : current)).id + 1;
	}

	function handleNew() {
		$state = [
			...$state,
			{
				id: newId(),
				data: {
					title: 'New Note',
					content: 'content'
				}
			}
		];
	}

	function handleDuplicate(id: number) {
		const note = $state.find((v) => v.id === id)?.data;
		if (!note) return;
		$state = [
			...$state,
			{
				id: newId(),
				data: {
					title: note.title,
					content: note.content,
					link: note.link
				}
			}
		];
	}

	function handleDelete(id: number) {
		$state = $state.filter((v) => v.id !== id);
	}

	//////////////// Editing Modal //////////////////

	let editModalOpen = false;
	let editModalId = 0;
	let editModalNote: Note | undefined = undefined;

	let titleInput: ValidatedInput<'title'>;
	let contentInput: ValidatedTextarea<'content'>;
	let linkInput: ValidatedInput<'link'>;

	function openEditModal(id: number) {
		editModalOpen = true;
		editModalId = id;
		editModalNote = $state.find((v) => v.id === id)?.data;

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
				$state[$state.findIndex((v) => v.id === editModalId)] = { id: editModalId, data: note };
				editModalOpen = false;
			}
		})();
	}
</script>

<Button color="alternative" on:click={handleNew}>New Note</Button>
<section
	use:dragHandleZone={{ items: visualState, flipDurationMs, dropTargetStyle: {} }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
	class="flex max-w-lg flex-col gap-4 py-4"
>
	{#each visualState as item (item.id)}
		<div class="w-full" animate:flip={{ duration: flipDurationMs }}>
			<EditableBoardNoteContent
				note={item.data}
				on:editButtonClick={() => openEditModal(item.id)}
				on:duplicateButtonClick={() => handleDuplicate(item.id)}
				on:deleteButtonClick={() => handleDelete(item.id)}
			/>
		</div>
	{/each}
</section>
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
