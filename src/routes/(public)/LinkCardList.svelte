<script lang="ts">
	import ExternalLink from '$components/ExternalLink.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import type { LinkCardListData } from '$lib/types/HomePageData';

	export let title: string;
	export let data: LinkCardListData;
</script>

<SectionHeader {title} />
<div class="flex flex-wrap items-start justify-center gap-4">
	{#each data.cards as card}
		<div
			class="flex flex-col overflow-hidden rounded-xl border bg-gray-50 p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
		>
			<h3 class="text-lg font-semibold">{card.title}</h3>
			<p class="leading-tight text-gray-700 dark:text-gray-400">{card.subtitle}</p>
			<ul class="mt-2 flex flex-col divide-y">
				{#each card.links as link}
					<li class="p-2 text-center dark:border-gray-700">
						<ExternalLink href={link.url} text={link.title} />
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
