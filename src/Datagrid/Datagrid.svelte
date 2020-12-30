<script>
    import { styles } from "../Utils/styles";
    import { csvStore } from "../Utils/stores";
    import Header from "./Header.svelte";
    import Rows from "./Rows.svelte";

    let width, gridColumns, columns, rows;

    const unsubscribe = csvStore.subscribe((val) => {
        width = val.columns?.reduce((acc, { width }) => acc + width, 0) + "px";
        gridColumns = val.columns
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
        padding: 0.5em;
        margin: auto;
        /* width: var(--width); */
        display: grid;
        grid-template-columns: var(--columns);
        grid-template-rows: 100px auto;
        align-items: center;
        justify-content: center;
        overflow: auto;
    }

    .row-container {
        grid-column-start: 1;
        grid-column-end: -1;
    }
</style>

<div class="container" use:styles={{ width, columns: gridColumns }}>
        <Header {columns} />
    <div class="row-container">
        <Rows {rows} {columns} {gridColumns}/>
    </div>
</div>
