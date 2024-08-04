<script lang="ts">
	import ExternalLink from "$components/ExternalLink.svelte";
	import SectionHeader from "$components/SectionHeader.svelte";
	import type { LinkCardListData } from "$lib/types/HomePageData";

    export let title: string;
    export let data: LinkCardListData;
</script>


<SectionHeader {title} />
<div class="flex flex-wrap items-start justify-center gap-4">
    {#each data.cards as card}
        <div class="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <h3 class="text-lg font-semibold">{card.title}</h3>
            <p class="text-gray-700 dark:text-gray-400 leading-tight">{card.subtitle}</p>
            <ul class="flex flex-col divide-y mt-2">
                {#each card.links as link}
                    <li class="p-2 text-center dark:border-gray-700">
                        <ExternalLink href={link.url} text={link.title} />
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</div>
