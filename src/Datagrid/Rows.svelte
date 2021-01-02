<script>
    import VirtualList from "svelte-tiny-virtual-list";
    import { csvStore, scrollIndex } from "../Utils/stores";
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
        height: 100%;
    }

    :global(.virtual-list-wrapper) {
        overflow-x: hidden !important;
    }

    .selected {
        animation: blinker 1s linear infinite;
        -webkit-animation: blinker 1s linear infinite;
    }
    @keyframes blinker {
        50% {
            opacity: 0.5;
        }
    }
    @-webkit-keyframes blinker {
        50% {
            opacity: 0.5;
        }
    }
</style>

<VirtualList
    width="100%"
    height={rows.length > 7 ? 600 : rows.length * 75}
    itemCount={rows.length}
    itemSize={75}
    scrollToIndex={$scrollIndex}
    scrollToAlignment={'start'}>
    <div slot="item" let:index let:style {style}>
        <div
            class="row"
            use:styles={{ columns: gridColumns }}
            class:selected={$csvStore.selection === index}>
            <Cell value={index} />
            {#each columns as { dataName }}
                <Cell
                    value={rows[index][dataName]}
                    rowData={{ index: index, dataName }} />
            {/each}
        </div>
    </div>
</VirtualList>
