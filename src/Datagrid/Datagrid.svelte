<script>
    import { styles } from "../Utils/styles";
    import { csvStore } from "../Utils/stores";
    import Header from "./Header.svelte";
    import Rows from "./Rows.svelte";

    $: gridColumns = $csvStore?.columns.reduce((acc) => acc + " 300px", "100px");
    $: columns = $csvStore?.columns
    $: rows = $csvStore?.rows
</script>

<style>
    .container {
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

{#if $csvStore}
    <div class="container" use:styles={{ columns: gridColumns }}>
        <Header {columns} />
        <div class="row-container">
            <Rows {rows} {columns} {gridColumns} />
        </div>
    </div>
{/if}
