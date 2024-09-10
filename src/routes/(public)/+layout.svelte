<script lang="ts">
	import type { GlobalPageData } from '$lib/types/GlobalPageData';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import QuickLinks from './QuickLinks.svelte';

	export let data: GlobalPageData;
</script>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<Header></Header>
	<div class="flex w-full flex-col items-center">
		<QuickLinks />
	</div>

	<slot></slot>
</div>
<Footer data={data.footer}></Footer>
