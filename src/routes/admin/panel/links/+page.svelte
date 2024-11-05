<script lang="ts">
	import SectionHeader from "$components/SectionHeader.svelte";
	import type { AdminShortLinkListData } from "$lib/types/LinkGeneratorData";
	import { A } from "flowbite-svelte";
	import EditableLinkList from "./EditableLinkList.svelte";


    export let data: AdminShortLinkListData;
</script>

<div class="flex flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<SectionHeader title="Short Links" />
		<p class="mb-8">User created shortened links. If you want to create your own, visit the <A href="/link-generator">Link Generator page</A>.</p>
		<EditableLinkList links={data.links} />
	</div>
</div>
