<script>
    import { csvStore, scrollIndex } from "../Utils/stores";
    import FileDownload from "./FileDownload.svelte";

</script>

<style>
    div {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 5px;
    }

    input {
        width: 8em;
        background: lightgray;
    }
</style>

{#if $csvStore.columns && $csvStore.rows}
    <div>
        <FileDownload />
        <button on:click={() => csvStore.addRow()}>Add Row</button>
        {#if $csvStore.selection !== null}
            <button on:click={() => csvStore.removeRow()}>Remove Row</button>
        {/if}

        <input type="number" bind:value={$scrollIndex}>
    </div>
{/if}
