<script lang="ts">
	import { Helper } from 'flowbite-svelte';

	/**
	 * Whether the input is valid or not, only renders the error message if false
	 * @default true
	 */
	export let isValid = true;
	/**
	 * The error message to display if the input is not valid
	 */
	export let errorMessage: string | undefined = undefined;
</script>

{#if !isValid && errorMessage}
	<Helper class="mt-2" color="red">
		{errorMessage}
	</Helper>
{/if}
