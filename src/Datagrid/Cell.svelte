<script>
    import debounce from "debounce";
    import { csvStore } from "../Utils/stores";
    export let rowData = null;
    export let value = "";

    const handleChange = debounce(
        () => {
            csvStore.updateCell(value, rowData);
        },
        200,
        true
    );

</script>

<style>
    .grid-cell {
        border: 1px black dashed;
        width: 100%;
        text-align: center;
    }

    .form__input {
        font-family: "Roboto", sans-serif;
        color: #333;
        font-size: 1.2rem;
        padding: 1.5rem 1rem;
        border-radius: 0.2rem;
        background-color: rgb(255, 255, 255);
        border: none;
        width: 100%;
        display: block;
        border-bottom: 0.3rem solid transparent;
        transition: all 0.3s;
    }

    .selection-cell {
        cursor: pointer;
    }

    .selected {
        background-color: #ffffb7;
    }
</style>

<div class="grid-cell">
    {#if rowData}
        <input
            type="text"
            class="form__input"
            bind:value
            on:change={handleChange} />
    {:else}
        <div class="selection-cell" on:click={() => csvStore.selectRow(value)}>
            <h3 class="form__input" class:selected={$csvStore.selection === value}>{value}</h3>
        </div>
    {/if}
</div>
