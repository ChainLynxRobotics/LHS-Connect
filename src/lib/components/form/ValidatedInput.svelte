<script lang="ts">
	import { Input } from "flowbite-svelte";
	import type { InputProps } from "flowbite-svelte/Input.svelte";

    interface $$Props extends InputProps {
        /** 
         * Used for error messages, for example "[contentName] is required"
         * @default "Field"
         */
        contentName?: string;
        /**
         * Whether a non-falsy input is required
         */
        required?: boolean;
        /**
         * A regular expression to test the input against
         */
        pattern?: RegExp;
        /** 
         * Whether to validate the input, set to true to enable validation (for example, during form submission)
         * @default false
         */
        validate?: boolean;
        /**
         * Whether to set {@link validate} to false when the input is changed
         */
        disableValidateOnInput?: boolean;
        /**
         * Backwards value binding for if the input is valid
         */
        isValid?: boolean;
    }


    export let validate: boolean|undefined = false;
    export let disableValidateOnInput: boolean|undefined = false;

    export let contentName: string = "Field";

    export let required: Boolean|undefined = false;
    export let pattern: RegExp|undefined = undefined;

    export let isValid = true;
    let errorMessage = '';

    let value: string;

    $: {
        if (validate) {
            if (required && !value) {
                isValid = false;
                errorMessage = `${contentName} is required`;
            } else if (pattern && !pattern.test(value)) {
                isValid = false;
                errorMessage = `${contentName} is invalid`;
            } else {
                isValid = true;
                errorMessage = '';
            }
        }
    }
    
</script>

<Input {$$restProps} bind:value color={isValid ? 'base' : 'red'} on:input={() => disableValidateOnInput ? validate = false : false}>
    <slot></slot>
</Input>