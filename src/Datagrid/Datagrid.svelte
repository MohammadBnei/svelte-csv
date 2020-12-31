<script>
    import { styles } from "../Utils/styles";
    import { csvStore } from "../Utils/stores";
    import Header from "./Header.svelte";
    import Rows from "./Rows.svelte";

    let gridColumns, columns, rows;

    const unsubscribe = csvStore.subscribe((val) => {
        gridColumns = "100px " + val.columns
            ?.reduce(
                (acc, { width }) => `${acc} ${width ? width + "px" : "300px"}`,
                ""
            )
            .trim();

        columns = val.columns;
        rows = val.rows;
    });
</script>

<style>
    .container {
        padding: 1em;
        margin: 5px;
        max-width: 100vw;
        min-width: 0;
        display: grid;
        grid-template-columns: var(--columns);
        grid-template-rows: 75px auto;
        align-items: center;
        overflow-x: auto;
    }

    .row-container{
        grid-column-start: 1;
        grid-column-end: -1;
    }
    .row-container :global(.virtual-list-wrapper){
        overflow-x: hidden;
    }
</style>

<div class="container" use:styles={{ columns: gridColumns }}>
        <Header {columns} />
    <div class="row-container">
        <Rows {rows} {columns} {gridColumns}/>
    </div>
</div>
