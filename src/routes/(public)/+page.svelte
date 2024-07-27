<svelte:head>
    <title>LHS Connect | Home</title>
</svelte:head>

<script lang="ts">
    let count = 0;

    function handleClick() {
        count += 1;
    }
</script>

<h1>Welcome to LHS Connect</h1>
<button on:click={handleClick}>
    Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
