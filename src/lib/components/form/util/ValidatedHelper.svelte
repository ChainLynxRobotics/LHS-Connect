<script lang="ts">
	import { Helper } from 'flowbite-svelte';

	interface Props {
		/**
		 * Whether the input is valid or not, only renders the error message if false
		 * @default true
		 */
		isValid?: boolean;
		/**
		 * The error message to display if the input is not valid
		 */
		errorMessage?: string;
	}

	let { isValid = true, errorMessage }: Props = $props();
</script>

{#if !isValid && errorMessage}
	<Helper class="mt-2" color="red">
		{errorMessage}
	</Helper>
{/if}
