<script lang="ts">
	import Header from './Header.svelte';
	import QuickLinks from './QuickLinks.svelte';
</script>


<Header></Header>
<div class="w-full flex flex-col items-center">
	<QuickLinks />
</div>

<slot></slot>
