<script lang="ts">
	import bulletinBoard from '$lib/fake_data/bulletinBoard';
	import type { BulletinBoardData, Note } from '$lib/types/HomePageData';
	import { dragHandleZone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import EditableBoardNoteContent from './EditableBoardNoteContent.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, ButtonGroup, Helper, Modal, Tooltip } from 'flowbite-svelte';
	import { createHistoryManager } from '$lib/util/clientHistoryManager';
	import { RedoOutline, UndoOutline } from 'flowbite-svelte-icons';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import bulletinBoardSchema from '$lib/schemas/bulletinBoardSchema';
	import { tick } from 'svelte';

	export let bulletinBoardData: BulletinBoardData = bulletinBoard; // TODO: Replace with real data

	const { state, undo, redo, canUndo, canRedo } = createHistoryManager(
		bulletinBoardData.notes.map((note, index) => ({
			id: index,
			note: note
		}))
	);

	$: visualState = $state; // Temp value for what is displayed during dragging. State is then updated once the drag is finalized.

	function handleNewNote() {
		$state = [
			...$state,
			{
				id:
					$state.reduce((prev, current) => (prev && prev.id > current.id ? prev : current)).id + 1, // Grab the highest id and then plus 1
				note: {
					title: 'New Note',
					content: 'content'
				}
			}
		];
	}

	// Drag and drop
	const flipDurationMs = 300;
	function handleDndConsider(e: CustomEvent<{ items: { id: number; note: Note }[] }>) {
		visualState = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<{ items: { id: number; note: Note }[] }>) {
		// Check if order has changed before updating state and history
		if (e.detail.items.map((v) => v.id).join(',') !== $state.map((v) => v.id).join(',')) {
			$state = e.detail.items; // Update the actual state now that its finalized
		}
	}

	// Editing
	let editModalOpen = false;
	let editModalId = 0;
	let editModalNote: Note | undefined = undefined;

	let titleInput: ValidatedInput<'title'>;
	let contentInput: ValidatedTextarea<'content'>;
	let linkInput: ValidatedInput<'link'>;

	function openEditModal(id: number) {
		editModalOpen = true;
		editModalId = id;
		editModalNote = $state.find((v) => v.id === id)?.note;

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
				$state[$state.findIndex((v) => v.id === editModalId)] = { id: editModalId, note };
				editModalOpen = false;
			}
		})();
	}

	function handleDuplicateNote(id: number) {
		const note = $state.find((v) => v.id === id)?.note;
		if (!note) return;
		$state = [
			...$state,
			{
				id:
					$state.reduce((prev, current) => (prev && prev.id > current.id ? prev : current)).id + 1, // Grab the highest id and then plus 1
				note: {
					title: note.title,
					content: note.content,
					link: note.link
				}
			}
		];
	}

	function handleDeleteNote(id: number) {
		$state = $state.filter((v) => v.id !== id);
	}
</script>

<div class="flex flex-col items-center p-4">
	<div class="mb-8 w-full max-w-lg">
		<SectionHeader title="Bulletin Board" />
		<p>The title and content support markdown, and you can drag the notes around.</p>
	</div>
	<Button color="alternative" on:click={handleNewNote}>New Note</Button>
	<section
		use:dragHandleZone={{ items: visualState, flipDurationMs, dropTargetStyle: {} }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="flex max-w-lg flex-col gap-4 py-4"
	>
		{#each visualState as item (item.id)}
			<div class="w-full" animate:flip={{ duration: flipDurationMs }}>
				<EditableBoardNoteContent
					note={item.note}
					on:editButtonClick={() => openEditModal(item.id)}
					on:duplicateButtonClick={() => handleDuplicateNote(item.id)}
					on:deleteButtonClick={() => handleDeleteNote(item.id)}
				/>
			</div>
		{/each}
	</section>
	<div class="flex gap-4">
		<ButtonGroup>
			<Button color="alternative" disabled={!$canUndo} on:click={undo}
				><UndoOutline class="h-6 w-6" /></Button
			>
			<Tooltip
				>Undo {#if !$canUndo}(unavailable){/if}</Tooltip
			>

			<Button color="alternative" disabled={!$canRedo} on:click={redo}
				><RedoOutline class="h-6 w-6" /></Button
			>
			<Tooltip
				>Redo {#if !$canRedo}(unavailable){/if}</Tooltip
			>
		</ButtonGroup>

		<Button color="primary">Publish</Button>
	</div>
</div>

<Modal bind:open={editModalOpen} size="md" autoclose={false}>
	<form class="flex flex-col space-y-6" action="#" on:submit={handleEditModalSubmit}>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Note</h3>
		<Helper>Markdown is supported</Helper>
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
