<script lang="ts">
	import { Input, Label, Textarea } from 'flowbite-svelte';
	import type { LabelProps } from 'flowbite-svelte/Label.svelte';
	import type { TextareaProps } from 'flowbite-svelte/Textarea.svelte';
	import ValidatedLabel from './util/ValidatedLabel.svelte';
	import ValidatedHelper from './util/ValidatedHelper.svelte';

	/**
	 * The id of the input element
	 */
	export let id: string | undefined = undefined;
	/**
	 * The label of the input element, shown above the input. Also used for error messages if `contentName` is not provided
	 */
	export let label: string | undefined = undefined;

	/**
	 * The value of the input element, used for two-way binding
	 */
	export let value: string = "";
	/**
	 * Whether to show errors to the user (for example, during form submission)
	 * @default true
	 */
	export let showValidation: boolean = true;
	/**
	 * Whether the input is valid or not, used for two-way binding
	 */
	export let isValid = true;

	/**
	 * Used for error messages, for example "[contentName] is required"
	 * If not provided, it defaults to the value of the `label` prop or "Field"
	 * @default "Field"
	 */
	export let contentName: string = label || 'Field';

	/**
	 * For validation, whether the input is required or not
	 */
	export let required: Boolean | undefined = false;
	/**
	 * For validation, a regular expression pattern to match the input value against
	 */
	export let pattern: RegExp | string | undefined = undefined;

	/**
	 * Props to pass to the {@link Input} component
	 */
	export let textareaProps: TextareaProps = {};
	/**
	 * Props to pass to the {@link Label} component
	 */
	export let labelProps: LabelProps = {};

	/**
	 * The error message to show if the input is invalid
	 */
	 export let errorMessage = '';

	$: {
		if (required && !value) {
			isValid = false;
			errorMessage = `${contentName} is required`;
		} else if (
			pattern &&
			!(typeof pattern === 'string' ? new RegExp(pattern) : pattern).test(value)
		) {
			isValid = false;
			errorMessage = `${contentName} is invalid`;
		} else {
			isValid = true;
			errorMessage = '';
		}
	}
</script>

<ValidatedLabel {id} {label} {isValid} {showValidation} {required} {labelProps} />
<Textarea
	{id}
	bind:value
	color={isValid ? 'base' : 'red'}
	formnovalidate
	{...textareaProps}
></Textarea>
<ValidatedHelper {isValid} {showValidation} {errorMessage} />
