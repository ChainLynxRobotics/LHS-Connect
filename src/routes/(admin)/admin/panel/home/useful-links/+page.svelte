<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import EditableLinkCardList from "./EditableLinkCardList.svelte";

</script>

<div class="flex flex-col items-center p-4">
	<div class="mb-8 w-full max-w-lg">
		<SectionHeader title="Useful Links" />
		<p></p>
	</div>
	<EditableLinkCardList />
</div>
