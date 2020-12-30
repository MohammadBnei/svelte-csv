<script>
    import Row from "./Row.svelte";

    export let rows;
    export let columns;
</script>

{#each rows as row, index}
    {#each columns as { dataName }}
        <Row value={row[dataName]} rowData={{ index, dataName }} />
    {/each}
{/each}
