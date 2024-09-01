<script lang="ts">
	import UndoRedoPublishBar from "$components/admin/UndoRedoPublishBar.svelte";
	import { default as initialKnownSchedules } from "$lib/fake_data/knownSchedules";
	import type { BellSchedule } from "$lib/types/HomePageData";
	import { createHistoryManager } from "$lib/util/clientHistoryManager";
	import { Button, Accordion } from "flowbite-svelte";
	import { dragHandleZone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import EditableScheduleItem from "./EditableScheduleItem.svelte";


    export let knownSchedules: BellSchedule[] = initialKnownSchedules;

    const { state, undo, redo, canUndo, canRedo } = createHistoryManager(
        // knownSchedules does NOT include an id param for each note, so we need to add it for dnd to work
		knownSchedules.map((schedule, index) => ({
			id: index,
			data: schedule
		}))
	);

    // Unpack the dnd state to be used in the component output
    $: knownSchedules = $state.map((v) => v.data); // Update the data to be saved when the state changes


    //////////////// Drag and drop //////////////////

    $: visualState = $state; // Temp value for what is displayed during dragging. State is then updated once the drag is finalized.

	const flipDurationMs = 300;
	function handleDndConsider(e: CustomEvent<{ items: { id: number; data: BellSchedule }[] }>) {
		visualState = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<{ items: { id: number; data: BellSchedule }[] }>) {
		visualState = e.detail.items;
		// Check if order has changed before updating state and history
		if (e.detail.items.map((v) => v.id).join(',') !== $state.map((v) => v.id).join(',')) {
			$state = e.detail.items; // Update the actual state now that its finalized
		}
	}

    //////////////// Editing //////////////////

    /**
     * Grab the highest id and then plus 1
     */
     function newId() {
        return $state.reduce((prev, current) => (prev && prev.id > current.id ? prev : current)).id + 1;
    }

	function handleNew() {
		$state = [
			...$state,
			{
				id: newId(),
				data: {
					name: 'New Schedule',
                    periods: [
                        {
                            name: 'Period 1',
                            start: '8:00',
                            end: '9:00'
                        },
                    ]
				}
			}
		];
	}

	function handleDuplicate(id: number) {
		const schedule = $state.find((v) => v.id === id)?.data;
		if (!schedule) return;
		$state = [
			...$state,
			{
				id: newId(),
				data: JSON.parse(JSON.stringify(schedule))
			}
		];
	}

	function handleDelete(id: number) {
		$state = $state.filter((v) => v.id !== id);
	}

</script>

<Button color="alternative" on:click={handleNew}>New Schedule</Button>
<Accordion flush defaultClass="w-full max-w-lg">
    <section
        use:dragHandleZone={{ items: visualState, flipDurationMs, dropTargetStyle: {} }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
		class="py-4"
    >
        {#each visualState as item (item.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="bg-white dark:bg-gray-900">
				<EditableScheduleItem
					schedule={item.data}
					on:editButtonClick={() => alert('TODO')}
					on:duplicateButtonClick={() => handleDuplicate(item.id)}
					on:deleteButtonClick={() => handleDelete(item.id)}
				/>
			</div>
        {/each}
    </section>
</Accordion>
<UndoRedoPublishBar canUndo={$canUndo} canRedo={$canRedo} canPublish={$canUndo} on:undo={undo} on:redo={redo} on:publish={()=>alert('TODO')} />