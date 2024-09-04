<script lang="ts">
	import type { LinkCard } from '$lib/types/HomePageData';
	import { createEventDispatcher } from 'svelte';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import DragHandleOutline from '$components/admin/DragHandleOutline.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import { Table, TableHead, TableHeadCell, TableBodyCell, Button } from 'flowbite-svelte';
	import { FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import linkCardSchema, {
		linkCardSchemaLinkName,
		linkCardSchemaLinkUrl
	} from '$lib/schemas/linkCardSchema';

	const flipDurationMs = 300;

	export let card: LinkCard;

	const dispatch = createEventDispatcher<{
		submit: LinkCard;
		cancel: null;
	}>();

	let title = card.title;
	let subtitle = card.subtitle;
	let links = card.links.map((link) => ({ ...link, id: Math.random() }));

	let titleInput: ValidatedInput<'title'>;
	let subtitleInput: ValidatedInput<'subtitle'>;
	let linkNameInputs: ValidatedInput<string>[] = [];
	let linkUrlInputs: ValidatedInput<string>[] = [];

	function handleAddLink() {
		links.push({
			title: 'Link',
			url: 'https://lhsconnect.com',
			id: Math.random()
		});
		links = links; // Force update
	}

	function handleDuplicateLink(index: number) {
		links.splice(index, 0, { ...links[index], id: Math.random() });
		links = links; // Force update
	}

	function handleDeleteLink(index: number) {
		links.splice(index, 1);
		links = links; // Force update
	}

	async function handleSave() {
		if (
			![
				...(await Promise.all(linkNameInputs.map((input) => input.validate(true)))),
				...(await Promise.all(linkUrlInputs.map((input) => input.validate(true)))),
				await titleInput.validate(true),
				await subtitleInput.validate(true)
			].every((valid) => valid)
		) {
			return;
		}

		dispatch('submit', {
			title,
			subtitle,
			links
		});
	}

	function handleDragConsider(event: CustomEvent<{ items: any[] }>) {
		links = event.detail.items;
	}
	function handleDragFinalize(event: CustomEvent<{ items: any[] }>) {
		links = event.detail.items;
	}
</script>

<form on:submit|preventDefault={handleSave} class="flex flex-col items-center gap-2">
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Card</h3>
	</div>
	<div class="w-full max-w-xs">
		<ValidatedInput
			bind:this={titleInput}
			id="title"
			label="Card Title"
			bind:value={title}
			validatorObject={linkCardSchema}
			visuallyRequired
		/>
	</div>
	<div class="w-full max-w-lg">
		<ValidatedInput
			bind:this={subtitleInput}
			id="subtitle"
			label="Card Subtitle"
			bind:value={subtitle}
			validatorObject={linkCardSchema}
		/>
	</div>

	<div class="w-full">
		<Table striped>
			<TableHead>
				<TableHeadCell></TableHeadCell>
				<TableHeadCell>Text</TableHeadCell>
				<TableHeadCell>Link</TableHeadCell>
			</TableHead>
			<tbody
				use:dragHandleZone={{ type: 'periods', items: links, flipDurationMs }}
				on:consider={handleDragConsider}
				on:finalize={handleDragFinalize}
			>
				{#each links as link, index (link.id)}
					<tr
						animate:flip={{ duration: flipDurationMs }}
						class="group border-b bg-white last:border-b-0 odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
					>
						<td use:dragHandle class="py-4 pl-6">
							<div class="flex items-center">
								<DragHandleOutline />
							</div>
						</td>
						<TableBodyCell tdClass="min-w-48 px-6 py-4 whitespace-nowrap font-medium">
							<ValidatedInput
								bind:this={linkNameInputs[index]}
								id={`link-${index}-name`}
								bind:value={link.title}
								validator={linkCardSchemaLinkName}
								visuallyRequired
							/>
						</TableBodyCell>
						<TableBodyCell>
							<ValidatedInput
								bind:this={linkUrlInputs[index]}
								id={`link-${index}-url`}
								bind:value={link.url}
								validator={linkCardSchemaLinkUrl}
								visuallyRequired
							/>
						</TableBodyCell>
						<TableBodyCell>
							<div class="flex">
								<button type="button" on:click={() => handleDuplicateLink(index)} class="!p-2"
									><FileCopyOutline class="h-6 w-6" /></button
								>
								<button type="button" on:click={() => handleDeleteLink(index)} class="!p-2"
									><TrashBinOutline class="h-6 w-6 text-red-500 dark:text-red-400" /></button
								>
							</div>
						</TableBodyCell>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>

	<div class="mt-2">
		<Button type="button" color="alternative" on:click={handleAddLink}>Add Link</Button>
	</div>

	<div class="mb-4 mt-6 flex gap-4">
		<Button type="button" color="alternative" on:click={() => dispatch('cancel')}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
