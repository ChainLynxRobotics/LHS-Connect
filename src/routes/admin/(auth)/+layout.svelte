<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from './Header.svelte';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<Header></Header>

	{@render children?.()}
</div>
