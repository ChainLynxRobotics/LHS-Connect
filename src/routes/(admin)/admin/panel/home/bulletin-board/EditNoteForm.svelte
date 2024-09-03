<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import ValidatedTextarea from "$components/form/ValidatedTextarea.svelte";
	import bulletinBoardSchema from "$lib/schemas/bulletinBoardSchema";
	import type { Note } from "$lib/types/HomePageData";
	import { Button, Helper } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";

    export let note: Note;

    const dispatch = createEventDispatcher<{
        submit: Note;
        cancel: null;
    }>();


    let title = note.title;
	let content = note.content;
	let link = note.link;

	let titleInput: ValidatedInput<'title'>;
	let contentInput: ValidatedTextarea<'content'>;
	let linkInput: ValidatedInput<'link'>;

	async function handleEditModalSubmit(e: SubmitEvent) {
		if (
			![
				await titleInput.validate(),
				await contentInput.validate(),
				await linkInput.validate()
			].every((v) => v)
		)
			return;
		const note = {
			title,
			content,
			link
		};
		dispatch('submit', note);
	}
</script>

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
            bind:value={title}
            validatorObject={bulletinBoardSchema}
            visuallyRequired
        />
    </div>
    <div>
        <ValidatedTextarea
            bind:this={contentInput}
            id="content"
            label="Content"
            bind:value={content}
            validatorObject={bulletinBoardSchema}
            visuallyRequired
        />
    </div>
    <div>
        <ValidatedInput
            bind:this={linkInput}
            id="link"
            label="Link"
            bind:value={link}
            validatorObject={bulletinBoardSchema}
        />
    </div>
    <div class="flex gap-4">
        <Button type="button" color="alternative" on:click={() => dispatch('cancel')}
            >Cancel</Button
        >
        <Button type="submit">Save</Button>
    </div>
</form>