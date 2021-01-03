<script>
    import { COLUMN_WIDTH, HEADER_ROW_HEIGHT, INDEX_COLUMN_WIDTH } from "../Utils/constants";
    import { styles } from "../Utils/styles";
    import { csvStore } from "../Utils/stores";
    import Header from "./Header.svelte";
    import Rows from "./Rows.svelte";

    $: gridColumns = $csvStore?.columns.reduce(
        (acc) => acc + ` ${COLUMN_WIDTH}px`,
        `${INDEX_COLUMN_WIDTH}px`
    );
    $: columns = $csvStore?.columns;
    $: rows = $csvStore?.rows;
</script>

<style>
    .container {
        display: grid;
        grid-template-columns: var(--columns);
        grid-template-rows: var(--header-row-height) auto;
        align-items: center;
        overflow-x: auto;
    }
    section {
        padding: 10px;
        max-width: 95vw;
        max-height: 100vw;
        box-shadow: 5px 10px 5px gray;
    }
    .row-container {
        grid-column-start: 1;
        grid-column-end: -1;
    }
</style>

{#if $csvStore}
    <section>
        <div class="container" use:styles={{ columns: gridColumns, 'header-row-height': HEADER_ROW_HEIGHT + "px" }}>
            <Header />
            <div class="row-container">
                <Rows {gridColumns} />
            </div>
        </div>
    </section>
{/if}
