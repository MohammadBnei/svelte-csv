<script>
    import { onDestroy } from "svelte";
    import { styles } from "../Utils/styles";
    import { csvStore } from "../Utils/stores";
    import Header from "./Header.svelte";
    import Rows from "./Rows.svelte";

    let gridColumns, columns, rows;

    const unsubscribe = csvStore.subscribe((val) => {
        gridColumns = val.columns?.reduce((acc) => acc + " 300px", "100px");

        columns = val.columns;
        rows = val.rows;
    });

    onDestroy(() => unsubscribe());
</script>

<style>
    .container {
        max-width: 100vw;
        min-width: 0;
        display: grid;
        grid-template-columns: var(--columns);
        grid-template-rows: 75px auto;
        align-items: center;
        overflow-x: auto;
    }

    .row-container {
        grid-column-start: 1;
        grid-column-end: -1;
    }
</style>

{#if columns && rows}
    <div class="container" use:styles={{ columns: gridColumns }}>
        <Header {columns} />
        <div class="row-container">
            <Rows {rows} {columns} {gridColumns} />
        </div>
    </div>
{/if}
