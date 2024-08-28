<script lang="ts">
	import bulletinBoard from "$lib/fake_data/bulletinBoard";
	import type { BulletinBoardData } from "$lib/types/HomePageData";
    import { dndzone } from 'svelte-dnd-action';
	import { flip } from "svelte/animate";
	import EditableBoardNoteContent from "./EditableBoardNoteContent.svelte";
	import SectionHeader from "$components/SectionHeader.svelte";
	import { Button } from "flowbite-svelte";


    export let bulletinBoardData: BulletinBoardData = bulletinBoard; // TODO: Replace with real data

    let items = bulletinBoardData.notes.map((note, index) => ({
        id: index,
        note: note,
    }));

    function handleNewNote() {
        items = [
            ...items,
            {
                id: items.length,
                note: {
                    title: "New Note",
                    content: "content",
                },
            },
        ];
    }


    // Drag and drop
    const flipDurationMs = 300;
    function handleDndConsider(e: CustomEvent) {
        items = e.detail.items;
    }
    function handleDndFinalize(e: CustomEvent) {
        items = e.detail.items;
    }
</script>

<div class="flex flex-col items-center p-4">
    <div class="w-full max-w-lg mb-8">
        <SectionHeader title="Bulletin Board" />
        <p>The title and content support markdown, and you can drag the notes around.</p>
    </div>
    <section use:dndzone={{items, flipDurationMs, dropTargetStyle: {}}} on:consider={handleDndConsider} on:finalize={handleDndFinalize} class="max-w-lg my-4 flex flex-col gap-4">
        {#each items as item(item.id)}
            <div class="w-full" animate:flip="{{duration: flipDurationMs}}">
                <EditableBoardNoteContent note={item.note} />
            </div>
        {/each}
    </section>
    <Button color="primary" on:click={handleNewNote}>New Note</Button>
</div>
