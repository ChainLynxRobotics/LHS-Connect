<script lang="ts">
    import type { FooterData } from "$lib/types/GlobalPageData";

    export let data: FooterData;
</script>

<footer class="w-full mt-16 p-8 text-gray-500 bg-gray-100 dark:text-gray-500 dark:bg-gray-800">
    <div class="flex flex-wrap justify-center gap-8 lg:gap-16">
        {#each data.usefulLinks.cards as card}
            <div>
                <h3 class="text-lg font-bold mb-2">{card.title}</h3>
                {#if card.subtitle}
                    <p class="text-xs">{card.subtitle}</p>
                {/if}
                <ul class="list-none">
                    {#each card.links as link}
                        <li class="mb-1">
                            <a href={link.url} target="_blank" rel="noopener" class="underline">{link.title}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
    <div class="bg-current h-[1px] lg:mx-16 my-8"></div>
    <div class="text-center mb-4">
        <a href="/about#contact" class="underline">Contact</a>
        <span class="mx-2">•</span>
        <a href="/about?type=report#contact" class="underline">Report Incorrect Information</a>
        <span class="mx-2">•</span>
        <a href="/discord" target="_blank" class="underline">Discord</a>
    </div>
    <p class="text-center text-xs">
        This website is not affiliated with Lincoln High School or Seattle Public Schools.
    </p>
</footer>