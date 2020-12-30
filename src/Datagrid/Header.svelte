<script>
    export let columns;
</script>

<style>
    .grid-cell {
        display: inline-table;
        text-align: center;
        border: 1px black solid;
        padding: 1rem;
    }
</style>

{#each columns as { display }}
    <div class="grid-cell">
        <h3>{display}</h3>
    </div>
{/each}
