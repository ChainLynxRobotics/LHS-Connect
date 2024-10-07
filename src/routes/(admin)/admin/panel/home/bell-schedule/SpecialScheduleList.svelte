<script lang="ts">
	import type { BellSchedule, ScheduleOverride } from "$lib/types/HomePageData";


    export let schedules: readonly BellSchedule[] = [];
    export let specials: ScheduleOverride[] = [];

    $: selectOptions = schedules.map((item) => ({ value: item.id, name: item?.name || "Unknown" }));
</script>