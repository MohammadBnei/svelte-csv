<script>
    import { styles } from "../Utils/styles";
    import Header from "./Header.svelte";
    import Rows from "./Rows.svelte";

    export let columns;
    export let rows;

    let width = columns.reduce((acc, { width }) => acc + width, 0) + "px";
    let gridColumns =
        columns.reduce((acc, { width }) => `${acc} ${width}px`, "").trim();
</script>

<style>
    div {
        padding: 0.5em;
        margin: auto;
        width: var(--width);
        display: grid;
        grid-template-columns: var(--columns);
        align-items: center;
        justify-content: center;
    }
</style>

<div use:styles={{ width, columns: gridColumns }}>
    <Header {columns} />
    <Rows {rows} {columns} />
</div>
