<script lang="ts">
	import DraggableList from '$components/admin/DraggableList.svelte';
	import contactInfo from '$lib/fake_data/contactInfo';
	import type { LinkCard } from '$lib/types/HomePageData';
	import EditableLinkCard from './EditableLinkCard.svelte';

	export let linkCards: LinkCard[] = contactInfo.cards;

	//////////////// Editing //////////////////

	function handleNew() {
		linkCards.push({
			title: 'New Card',
			links: []
		});
		linkCards = linkCards; // Force update
	}

	function handleEdit(index: number, card: LinkCard) {
		linkCards[index] = card;
	}

	function handleDuplicate(index: number) {
		linkCards.splice(index, 0, JSON.parse(JSON.stringify(linkCards[index])));
		linkCards = linkCards; // Force update
	}

	function handleDelete(index: number) {
		linkCards.splice(index, 1);
		linkCards = linkCards; // Force update
	}
</script>

<DraggableList
	dragZoneType="cards"
	items={linkCards}
	update={(items) => (linkCards = items)}
	sectionClass="flex max-w-lg flex-col gap-4 py-4"
	dragWrapperClass="w-full"
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
