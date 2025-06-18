<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import { Button, Helper } from 'flowbite-svelte';
	import type { IBulletinBoardNote } from '$lib/types/crud/bulletinBoard';
	import type { WithoutID } from '$lib/types/crud/globalCrud';
	import bulletinBoardNoteValidator from '$lib/validation/crud/bulletinBoardNoteValidator';

	interface Props {
		note: WithoutID<IBulletinBoardNote>;
		onSubmit: (note: WithoutID<IBulletinBoardNote>) => void;
		onCancel: () => void;
	}

	let { note, onSubmit: submit, onCancel: cancel }: Props = $props();

	let title = $state(note.title);
	let content = $state(note.content);
	let link = $state(note.link);

	let titleInput: ValidatedInput<'title'> | undefined = $state();
	let contentInput: ValidatedTextarea<'content'> | undefined = $state();
	let linkInput: ValidatedInput<'link'> | undefined = $state();

	async function onsubmit(e: Event) {
		e.preventDefault();
		submit({
			title: await titleInput!.validate(),
			content: await contentInput!.validate(),
			link: await linkInput!.validate()
		});
	}
</script>

<form class="flex flex-col space-y-6" {onsubmit}>
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Note</h3>
		<Helper>Markdown is supported</Helper>
	</div>
	<div>
		<ValidatedInput
			bind:this={titleInput}
			id="title"
			label="Title"
			bind:value={title}
			validatorObject={bulletinBoardNoteValidator}
			visuallyRequired
		/>
	</div>
	<div>
		<ValidatedTextarea
			bind:this={contentInput}
			id="content"
			label="Content"
			bind:value={content}
			validatorObject={bulletinBoardNoteValidator}
			visuallyRequired
			textareaProps={{ rows: 5 }}
		/>
	</div>
	<div>
		<ValidatedInput
			bind:this={linkInput}
			id="link"
			label="Link"
			bind:value={link}
			validatorObject={bulletinBoardNoteValidator}
		/>
	</div>
	<div class="flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
