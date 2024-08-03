<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import type { LinkCardListData } from "$lib/types/HomePageData";

    export let title: string;
    export let data: LinkCardListData;
</script>


<SectionHeader {title} />
<div class="flex flex-wrap items-start justify-center gap-4">
    {#each data.cards as card}
        <div class="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <h3 class="text-lg font-semibold">{card.title}</h3>
            <p class="text-gray-700 dark:text-gray-400 leading-tight">{card.subtitle}</p>
            <ul class="flex flex-col divide-y mt-2">
                {#each card.links as link}
                    <li class="p-2 text-center dark:border-gray-700">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" class="font-medium text-blue-600 hover:underline dark:text-blue-400">{link.title}</a>
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</div>
