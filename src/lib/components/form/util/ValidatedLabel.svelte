<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import type { LabelProps } from 'flowbite-svelte/Label.svelte';

	/**
	 * The id of the input element
	 */
	export let id: string | undefined = undefined;
	/**
	 * The text on the label, will not render a label if not provided
	 */
	export let label: string | undefined = undefined;
	/**
	 * Props to pass to the {@link Label} component
	 */
	export let labelProps: LabelProps = {};
	/**
	 * Whether the input is valid or not, rendered with red text if false
	 * @default true
	 */
	export let isValid = true;
	/**
	 * Whether the input is required or not, will render a red asterisk if true
	 */
	export let required: Boolean | undefined = false;
	
</script>

{#if label}
	<Label for={id} color={isValid ? undefined : 'red'} class="mb-2" {...labelProps}>
		{label}
		<slot />
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</Label>
{/if}
