<script lang="ts">
	interface Props {
		title?: string;
	}

	let { title = '' }: Props = $props();
</script>

<h3 class="mb-4 border-b-4 border-red-500 text-2xl">
	<b>{title}</b>
</h3>
