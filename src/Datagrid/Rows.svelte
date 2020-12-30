<script>
    import VirtualList from "svelte-tiny-virtual-list";
    import { styles } from "../Utils/styles";
    import Cell from "./Cell.svelte";

    export let rows;
    export let columns;
    export let gridColumns;
</script>

<style>
    .v-list {
        grid-column-start: 1;
        grid-column-end: -1;
    }

    .row {
        display: grid;
        grid-template-columns: var(--columns);
    }
</style>

<div class="v-list">
    <VirtualList
        width="100%"
        height={700}
        itemCount={rows.length}
        itemSize={75}>
        <div slot="item" let:index let:style {style}>
            <div class="row" use:styles={{ columns: gridColumns }}>
                {#each columns as { dataIndex }}
                    <Cell
                        value={rows[index][dataIndex]}
                        rowData={{ index, dataIndex }} />
                {/each}
            </div>
        </div>
    </VirtualList>
</div>
<!-- {#each rows as row, index}
    {#each columns as { dataIndex }}
        <Row value={row[dataIndex]} rowData={{ index, dataIndex }} />
    {/each}
{/each} -->
