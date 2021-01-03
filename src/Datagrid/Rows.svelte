<script>
    import debounce from "lodash.debounce";
    import VirtualList from "svelte-tiny-virtual-list";
    import {
        MAX_ROWS_VISIBLE,
        ROWS_CONTAINER_MAX_HEIGHT,
        ROW_HEIGHT,
    } from "../Utils/constants";
    import { csvStore, scrollIndex } from "../Utils/stores";
    import { styles } from "../Utils/styles";
    import Cell from "./Cell.svelte";

    export let gridColumns;

    $: rows = $csvStore.rows;

    const afterScrollSmooth = debounce(({ detail }) => {
        if (detail.offset % ROW_HEIGHT === 0) return;
        let pixelsToRow = 0;
        while (pixelsToRow < detail.offset) {
            pixelsToRow += ROW_HEIGHT;
        }
        detail.event.target.scrollTo({
            top: pixelsToRow,
            behavior: "smooth",
        });
    }, 200);
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
    }
    @keyframes blinker {
        50% {
            opacity: 0.5;
        }
    }
</style>

<VirtualList
    width="100%"
    height={rows.length > MAX_ROWS_VISIBLE ? ROWS_CONTAINER_MAX_HEIGHT : rows.length * ROW_HEIGHT}
    itemCount={rows.length}
    itemSize={75}
    overscanCount={rows.length > MAX_ROWS_VISIBLE ? 12 : 0}
    scrollToIndex={$scrollIndex}
    on:afterScroll={afterScrollSmooth}
    scrollToAlignment={'start'}>
    <div slot="item" let:index let:style {style}>
        <div
            class="row"
            use:styles={{ columns: gridColumns }}
            class:selected={$csvStore.selection === index}>
            <Cell value={index + 1} />
            {#each $csvStore.columns as { dataName }}
                <Cell
                    value={rows[index][dataName]}
                    rowData={{ index: index, dataName }} />
            {/each}
        </div>
    </div>
</VirtualList>
