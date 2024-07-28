<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { MoonOutline, SunOutline } from "flowbite-svelte-icons";
	import { getContext } from "svelte";
	import type { ThemeContext } from "../+layout.svelte";

    let theme = getContext<ThemeContext>("theme");

    function handleClick() {
        theme.update((value) => value === "dark" ? "light" : "dark");
    }
</script>

<Button size="sm" on:click={handleClick} color="none">
    {#if $theme === "dark"}
        <SunOutline></SunOutline>
    {:else}
        <MoonOutline></MoonOutline>
    {/if}
</Button>