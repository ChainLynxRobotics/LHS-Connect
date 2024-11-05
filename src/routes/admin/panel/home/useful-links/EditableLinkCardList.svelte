<script lang="ts">
	import DraggableList from '$components/admin/DraggableList.svelte';
	import type { LinkCard } from '$lib/types/HomePageData';
	import { Button } from 'flowbite-svelte';
	import EditableLinkCard from './EditableLinkCard.svelte';

	export let cards: LinkCard[];

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
    <div class="flex justify-center mb-8">
        <Button color="alternative" on:click={handleNew}>New Card</Button>
    </div>

	<DraggableList
		dragZoneType="cards"
		items={cards}
		update={(items) => (cards = items)}
		sectionClass="flex flex-wrap gap-4 py-4 justify-center"
		let:item
		let:index
	>
		<EditableLinkCard
			card={item}
			on:edit={(e) => handleEdit(index, e.detail)}
			on:duplicate={() => handleDuplicate(index)}
			on:delete={() => handleDelete(index)}
		/>
	</DraggableList>
</div>