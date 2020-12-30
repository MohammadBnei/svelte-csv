<script>
    export let columns;
</script>

<style>
    h3 {
        display: inline-table;
        text-align: center;
        border: 1px black solid;

    }
</style>

{#each columns as { display }}
    <h3>{display}</h3>
{/each}
