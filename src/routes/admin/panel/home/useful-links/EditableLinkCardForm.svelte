<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import DragHandleOutline from '$components/admin/DragHandleOutline.svelte';
	import { Table, TableHead, TableHeadCell, TableBodyCell, Button } from 'flowbite-svelte';
	import { FileCopyOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { WithoutID } from '$lib/types/crud/globalCrud';
	import type { ILinkCard } from '$lib/types/crud/linkCard';
	import linkCardValidator, { linkCardLinkNameValidator, linkCardLinkUrlValidator } from '$lib/validation/crud/linkCardValidator';

	const flipDurationMs = 300;

	interface Props {
		card: ILinkCard;
		onSubmit: (card: WithoutID<ILinkCard>) => void;
		onCancel: () => void;
	}

	let { card, onSubmit: submit, onCancel: cancel }: Props = $props();

	let title = $state(card.title);
	let subtitle = $state(card.subtitle);
	let links = $state(card.links.map((link) => ({ ...link, id: Math.random() })));

	let titleInput: ValidatedInput<'title'> | undefined = $state();
	let subtitleInput: ValidatedInput<'subtitle'> | undefined = $state();
	let linkNameInputs: ValidatedInput<string>[] = $state([]);
	let linkUrlInputs: ValidatedInput<string>[] = $state([]);

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

	async function onsubmit(event: Event) {
		event.preventDefault();

		await Promise.all(linkNameInputs.map((input) => input.validate()));
		await Promise.all(linkUrlInputs.map((input) => input.validate()));

		submit({
			title: await titleInput!.validate(),
			subtitle: await subtitleInput!.validate(),
			links: links.map((link) => ({ ...link, id: undefined }))
		});
	}

	function handleDragConsider(event: CustomEvent<{ items: any[] }>) {
		links = event.detail.items;
	}
	function handleDragFinalize(event: CustomEvent<{ items: any[] }>) {
		links = event.detail.items;
	}
</script>

<form {onsubmit} class="flex flex-col items-center gap-2">
	<div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Card</h3>
	</div>
	<div class="w-full max-w-xs">
		<ValidatedInput
			bind:this={titleInput}
			id="title"
			label="Card Title"
			bind:value={title}
			validatorObject={linkCardValidator}
			visuallyRequired
		/>
	</div>
	<div class="w-full max-w-lg">
		<ValidatedInput
			bind:this={subtitleInput}
			id="subtitle"
			label="Card Subtitle"
			bind:value={subtitle}
			validatorObject={linkCardValidator}
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
				onconsider={handleDragConsider}
				onfinalize={handleDragFinalize}
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
								validator={linkCardLinkNameValidator}
								visuallyRequired
							/>
						</TableBodyCell>
						<TableBodyCell>
							<ValidatedInput
								bind:this={linkUrlInputs[index]}
								id={`link-${index}-url`}
								bind:value={link.url}
								validator={linkCardLinkUrlValidator}
								visuallyRequired
							/>
						</TableBodyCell>
						<TableBodyCell>
							<div class="flex">
								<button type="button" onclick={() => handleDuplicateLink(index)} class="!p-2"
									><FileCopyOutline class="h-6 w-6" /></button
								>
								<button type="button" onclick={() => handleDeleteLink(index)} class="!p-2"
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

	<div class="mb-4 mt-6 flex justify-center gap-4">
		<Button type="button" color="alternative" on:click={cancel}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>
