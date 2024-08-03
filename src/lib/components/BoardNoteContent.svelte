<script lang="ts">
	import type { Note } from "$lib/types/HomePageData";
	import { ChevronRightOutline } from "flowbite-svelte-icons";
	import SvelteMarkdown from "svelte-markdown";

    export let note: Note;

</script>
<div class="flex bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden {note.link && 'hover:bg-gray-100 dark:hover:bg-gray-700 transition'}">
    <div class="w-full p-4">
        <h2 class="text-lg font-semibold prose">
            <SvelteMarkdown source={note.title} isInline />
        </h2>
        <div class="text-gray-700 dark:text-gray-400 leading-tight prose">
            <SvelteMarkdown source={note.content} />
        </div>
    </div>
    {#if note.link}
        <div class="flex items-center p-2">
            <ChevronRightOutline size="xl" />
        </div>
    {/if}
</div>