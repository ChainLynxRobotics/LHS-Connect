<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import type { ClubPageData } from "$lib/types/ClubPageData";
	import EditableClubList from "./EditableClubList.svelte";

    export let data: ClubPageData;

</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-7xl">
		<SectionHeader title="Club List" />
		<p class="mb-8">Alphabetical list of clubs</p>
		<EditableClubList clubs={data.clubs} />
	</div>
</div>
