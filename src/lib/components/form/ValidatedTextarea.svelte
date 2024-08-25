<svelte:options accessors />

<script lang="ts" generics="ID extends string">
	import { Input, Label, Textarea } from 'flowbite-svelte';
	import type { LabelProps } from 'flowbite-svelte/Label.svelte';
	import type { TextareaProps } from 'flowbite-svelte/Textarea.svelte';
	import ValidatedLabel from './util/ValidatedLabel.svelte';
	import ValidatedHelper from './util/ValidatedHelper.svelte';
	import { ObjectSchema, type StringSchema, ValidationError } from 'yup';

	/**
	 * The id of the input element
	 */
	export let id: ID;
	/**
	 * The label of the input element, shown above the input. Also used for error messages if `contentName` is not provided
	 */
	export let label: string | undefined = undefined;
	/**
	 * The value of the input element, used for two-way binding
	 */
	export let value: string = "";

	/**
	 * The validator for the input element
	 */
	 export let validator: StringSchema | undefined = undefined;
	/**
	 * The validator for the input element, but uses the `validateAt` method of an object schema with the provided id as the argument
	 */
	export let validatorObject: ObjectSchema<{[k in ID]: string}> | undefined = undefined;

	/**
	 * VISUAL ONLY, whether the input is required or not, and should have a red asterisk
	 */
	 export let visuallyRequired: boolean | undefined = false;
	/**
	 * Props to pass to the {@link Input} component
	 */
	export let textareaProps: TextareaProps = {};
	/**
	 * Props to pass to the {@link Label} component
	 */
	export let labelProps: LabelProps = {};



	let checkValidation = false;

	let errorMessage = '';

	export async function validate(): Promise<boolean> {
		checkValidation = true;
		try {
			if (validatorObject) {
				await validatorObject.validateAt(id, {[id]: value});
			} else if (validator) {
				await validator.validate(value);
			}
			errorMessage = '';
			return true;
		} catch (error: unknown) {
			if (error instanceof ValidationError) {
				errorMessage = error.message;
			}
			return false;
		}
	}

	$: isValid = errorMessage === '';

</script>

<ValidatedLabel {id} {label} {isValid} required={visuallyRequired} {labelProps} />
<Textarea
	{id}
	bind:value
	color={isValid ? 'base' : 'red'}
	formnovalidate
	on:blur={validate}
	on:input={() => checkValidation && validate()}
	{...textareaProps}
></Textarea>
<ValidatedHelper {isValid} {errorMessage} />
