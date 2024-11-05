<script lang="ts">
	import Header from './Header.svelte';
</script>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<Header></Header>

	<slot></slot>
</div>
