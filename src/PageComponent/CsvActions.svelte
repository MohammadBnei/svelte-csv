<script>
    import debounce from "lodash/debounce";
    import { csvStore, scrollIndex } from "../Utils/stores";
    import FileDownload from "./FileDownload.svelte";

    const handleScrollTo = debounce(
        (e) => ($scrollIndex = e.target.value && Number(e.target.value)),
        200
    );
</script>

<style>
    div {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 5px;
    }

    input {
        width: 10em;
    }

    ::placeholder {
        color: white;
    }
</style>

{#if $csvStore}
    <div>
        <FileDownload />
        <button on:click={() => csvStore.addRow()}>Add Row</button>
        {#if $csvStore.selection !== null}
            <button on:click={() => csvStore.removeRow()}>Remove Row</button>
        {/if}

        <input
            type="number"
            value={$scrollIndex}
            on:input={handleScrollTo}
            placeholder="Go to line..." />
    </div>
{/if}
