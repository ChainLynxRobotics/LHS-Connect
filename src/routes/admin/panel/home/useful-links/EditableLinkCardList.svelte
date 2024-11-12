<script lang="ts">
	import DraggableList from '$components/admin/DraggableList.svelte';
	import type { LinkCard } from '$lib/types/HomePageData';
	import { Button } from 'flowbite-svelte';
	import EditableLinkCard from './EditableLinkCard.svelte';

	interface Props {
		cards: LinkCard[];
	}

	let { cards = $bindable() }: Props = $props();

	//////////////// Editing //////////////////

	function handleNew() {
		cards.push({
			title: 'New Card',
			links: []
		});
		cards = cards; // Force update
	}

	function handleEdit(index: number, card: LinkCard) {
		cards[index] = card;
	}

	function handleDuplicate(index: number) {
		cards.splice(index, 0, JSON.parse(JSON.stringify(cards[index])));
		cards = cards; // Force update
	}

	function handleDelete(index: number) {
		cards.splice(index, 1);
		cards = cards; // Force update
	}
</script>

<div class="w-full">
	<div class="mb-8 flex justify-center">
		<Button color="alternative" on:click={handleNew}>New Card</Button>
	</div>

	<DraggableList
		dragZoneType="cards"
		items={cards}
		update={(items) => (cards = items)}
		sectionClass="flex flex-wrap gap-4 py-4 justify-center"
	>
		{#snippet children({ item, index })}
			<EditableLinkCard
				card={item}
				onEdit={(e) => handleEdit(index, e)}
				onDuplicate={() => handleDuplicate(index)}
				onDelete={() => handleDelete(index)}
			/>
		{/snippet}
	</DraggableList>
</div>
