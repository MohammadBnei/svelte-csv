<script>
    import VirtualList from "svelte-tiny-virtual-list";
    import { scrollIndex } from "../Utils/stores";
    import { styles } from "../Utils/styles";
    import Cell from "./Cell.svelte";

    export let rows;
    export let columns;
    export let gridColumns;


</script>

<style>
    .row {
        display: grid;
        grid-template-columns: var(--columns);
    }
</style>

<VirtualList
    width="100%"
    height={600}
    itemCount={rows.length}
    itemSize={75}
    scrollToIndex={$scrollIndex}
    scrollToAlignment={'start'}>
    <div slot="item" let:index let:style {style}>
        <div class="row" use:styles={{ columns: gridColumns }}>
            <Cell value={index} />
            {#each columns as { dataName }}
                <Cell
                    value={rows[index][dataName]}
                    rowData={{ index: index, dataName }} />
            {/each}
        </div>
    </div>
</VirtualList>
