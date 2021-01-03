<script>
    import debounce from "lodash.debounce";
    import { csvStore } from "../Utils/stores";
    export let rowData = null;
    export let value = "";
</script>

<style>
    .grid-cell {
        border: 1px black dashed;
        width: 100%;
        text-align: center;
    }

    :global(.form__input) {
        font-family: "Roboto", sans-serif;
        cursor: text;
        color: #333;
        font-size: 1.2rem;
        border-radius: 0.2rem;
        background-color: rgb(255, 255, 255);
        border: none;
        width: 100%;
        height: 100%;
        border-bottom: 0.3rem solid transparent;
        transition: all 0.3s;
    }

    .selection-cell {
        cursor: pointer;
        background-color: white;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
</style>

<div class="grid-cell">
    {#if rowData}
        <input
            class="form__input"
            {value}
            on:input={debounce((e) => csvStore.updateCell(e.target.value, rowData), 300)} />
    {:else}
        <div class="selection-cell" on:click={() => csvStore.selectRow(value)}>
            <h3>{value}</h3>
        </div>
    {/if}
</div>
