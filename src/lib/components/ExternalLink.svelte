<script lang="ts">
	interface Props {
		href: string;
		text: string;
	}

	let { href, text }: Props = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="font-medium text-blue-600 underline dark:text-blue-400"
>
	{text}
</a>
