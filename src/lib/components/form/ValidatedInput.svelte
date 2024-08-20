<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import type { InputProps } from 'flowbite-svelte/Input.svelte';
	import type { LabelProps } from 'flowbite-svelte/Label.svelte';
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
	export let value: string;
	/**
	 * Whether to validate the input, set to true to enable validation (for example, during form submission)
	 * @default false
	 */
	export let validate: boolean | undefined = false;
	/**
	 * Whether the input is valid or not, used for two-way binding
	 * @default true
	 */
	export let isValid = true;
	/**
	 * Whether to set `validate` to false when the input is changed
	 * @default false
	 */
	export let disableValidateOnInput: boolean | undefined = false;

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
	export let inputProps: InputProps = {};
	/**
	 * Props to pass to the {@link Label} component
	 */
	export let labelProps: LabelProps = {};

	let errorMessage = '';

	$: {
		if (validate) {
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
		} else {
			isValid = true;
			errorMessage = '';
		}
	}
</script>

<ValidatedLabel {id} {label} {isValid} {required} {labelProps} />
<Input
	{id}
	bind:value
	color={isValid ? 'base' : 'red'}
	on:input={() => (disableValidateOnInput ? (validate = false) : false)}
	{...inputProps}
></Input>
<ValidatedHelper {isValid} {errorMessage} />
