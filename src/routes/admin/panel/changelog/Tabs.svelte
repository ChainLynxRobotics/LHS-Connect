<script lang="ts">
	import { TabItem, Tabs } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		table: Snippet;
	}

	let { table }: Props = $props();
</script>

<Tabs>
	<TabItem>
		{@render table()}
	</TabItem>
</Tabs>
