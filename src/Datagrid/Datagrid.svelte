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
    div {
        padding: 0.5em;
        margin: auto;
        width: var(--width);
        display: grid;
        grid-template-columns: var(--columns);
        grid-template-rows: 100px auto;
        align-items: center;
        justify-content: center;
    }
</style>

<div use:styles={{ width, columns: gridColumns }}>
    <Header {columns} />
    <Rows {rows} {columns} {gridColumns}/>
</div>
