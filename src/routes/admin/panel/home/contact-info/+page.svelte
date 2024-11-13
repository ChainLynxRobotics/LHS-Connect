<script lang="ts">
	import CrudList from '$components/admin/CRUDList.svelte';
	import DraggableList from '$components/admin/DraggableList.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';
	import { Button } from 'flowbite-svelte';
	import EditableLinkCard from '../useful-links/EditableLinkCard.svelte';

	interface Props {
		data: LinkCardListData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Contact Info" />
		<p class="mb-8"></p>
		<CrudList
			initialItems={data.cards}
			generateNewItem={() => ({
				title: 'New Card',
				links: []
			})}
			canReorder={true}
			initialOrder={data.cards.map((card) => card.id)}
		>
			{#snippet renderItems({ items, create, reorder })}
				<div class="mb-8 flex justify-center">
					<Button color="alternative" on:click={create}>New Card</Button>
				</div>
				<DraggableList
					dragZoneType="cards"
					items={items}
					updateOrder={reorder}
					sectionClass="flex flex-col gap-4 py-4 items-center"
				>
					{#snippet item({ item, update, duplicate, remove })}
						<EditableLinkCard
							card={item}
							onUpdate={update}
							onDuplicate={duplicate}
							onRemove={remove}
						/>
					{/snippet}
				</DraggableList>
			{/snippet}
		</CrudList>
	</div>
</div>
