<script lang="ts">
	export let href: string;
	export let text: string;
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="font-medium text-blue-600 underline dark:text-blue-400">
		{text}
</a>
