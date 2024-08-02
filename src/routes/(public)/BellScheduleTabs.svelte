<script lang="ts">
    import BellScheduleTable from "$components/BellScheduleTable.svelte";
    import SectionHeader from "$components/SectionHeader.svelte";
	import type { BellSchedule, BellScheduleData } from "$lib/types/HomePageData";
	import { Accordion, AccordionItem, TabItem, Tabs } from "flowbite-svelte";
	    
    // Import the data from the parent component
    export let data: BellScheduleData;


    // Precalculate the shown tabs and the selected tab

    let tabs: BellSchedule[] = [];
    let selectedTab = 0;

    // Get the default schedules for the week
    const dayOfWeek = new Date().getDay();
    for (const item of data.defaults) {
        tabs.push(item.schedule);
        if (item.daysOfWeek.includes(dayOfWeek)) {
            selectedTab = tabs.length - 1;
        }
    }

    // Get the special schedule for today
    const date = new Date().setHours(0, 0, 0, 0);
    for (const item of data.special) {
        if (new Date(item.date).getTime() == date) {
            tabs.push(item.schedule);
            selectedTab = tabs.length - 1;
        }
    }

    let upcomingSpecialSchedules = data.special.filter(item => new Date(item.date) > new Date());
</script>


<SectionHeader title="Bell Schedule" />
<Tabs tabStyle="none" contentClass="pt-4 bg-white dark:bg-gray-900" defaultClass="flex flex-wrap ltr:mr-2 rtl:ml-2">
    {#each tabs as tab, i}
        <TabItem open={i === selectedTab}>
            <span slot="title">{tab.name}</span>
            <BellScheduleTable schedule={tab} reactive={i === selectedTab} />
        </TabItem>
    {/each}

    {#if upcomingSpecialSchedules.length > 0}
        <TabItem>
            <div slot="title" class="flex items-center gap-2">
                Upcoming...
            </div>
            <Accordion multiple>
                {#each upcomingSpecialSchedules as special}
                    <AccordionItem>
                        <span slot="header">{(new Date(special.date)).toDateString()} - {special.schedule.name}</span>
                        <BellScheduleTable schedule={special.schedule} />
                    </AccordionItem>
                {/each}
            </Accordion>
        </TabItem>
    {/if}
</Tabs>

