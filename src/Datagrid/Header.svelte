<script>
    export let columns;
</script>

<style>
    .grid-cell {
        display: inline-table;
        text-align: center;
        border: 1px black solid;
        padding: 1rem;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: white;
    }
</style>

{#each columns as { display }}
    <h3 class="grid-cell">{display}</h3>
{/each}
