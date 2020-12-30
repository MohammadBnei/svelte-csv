<script>
    export let rows;
    export let columns;
</script>

<style>
    .grid-cell {
        border: 1px black dashed;
        width: 100%;
        text-align: center;
    }
</style>

{#each rows as row}
    {#each columns as { dataName }}
        <h6 class="grid-cell">{row[dataName]}</h6>
    {/each}
{/each}
