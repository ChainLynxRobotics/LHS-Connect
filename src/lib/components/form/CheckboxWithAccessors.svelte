<svelte:options accessors />

<script lang="ts">
	import type { CheckboxProps } from "flowbite-svelte/Checkbox.svelte";
	import Checkbox from "flowbite-svelte/Checkbox.svelte";


    export let checked: boolean = false;
    export let checkboxProps:CheckboxProps = {};
</script>

<Checkbox bind:checked={checked} {...checkboxProps} />