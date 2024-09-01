<script lang="ts">
	import { Button, ButtonGroup, Tooltip } from "flowbite-svelte";
	import { RedoOutline, UndoOutline } from "flowbite-svelte-icons";
	import { createEventDispatcher } from "svelte";

    export let canUndo: boolean = false;
    export let canRedo: boolean = false;
    export let canPublish: boolean = false;

    const dispatch = createEventDispatcher<{
		undo: null;
		redo: null;
		publish: null;
	}>();

    
</script>

<svelte:window 
    on:keydown={(event) => event.key === 'z' && event.ctrlKey && dispatch('undo')} 
    on:keydown={(event) => event.key === 'y' && event.ctrlKey && dispatch('redo')}
    on:keydown={(event) => event.key === 's' && event.ctrlKey && dispatch('publish')}
    on:beforeunload={(event) => {
        if (canPublish) {
            event.preventDefault();
            event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return 'You have unsaved changes. Are you sure you want to leave?';
        }
    }}
/>

<div class="flex gap-4">
    <ButtonGroup>
        <Button color="alternative" disabled={!canUndo} on:click={()=>dispatch('undo')}
            ><UndoOutline class="h-6 w-6" /></Button
        >
        <Tooltip
            >Undo {#if !canUndo}(unavailable){/if}</Tooltip
        >

        <Button color="alternative" disabled={!canRedo} on:click={()=>dispatch('redo')}
            ><RedoOutline class="h-6 w-6" /></Button
        >
        <Tooltip
            >Redo {#if !canRedo}(unavailable){/if}</Tooltip
        >
    </ButtonGroup>

    <Button color="primary" disabled={!canPublish} on:click={()=>dispatch('undo')}>Publish</Button>
    <Tooltip
        >Make your changes publicly visible {#if !canPublish}(unavailable){/if}</Tooltip
    >
</div>