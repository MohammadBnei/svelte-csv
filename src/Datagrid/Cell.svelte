<script>
    import { csvStore } from "../Utils/stores";
    export let rowData = null;
    export let value = "";

    let valueType = "text";

    $: switch (typeof value) {
        case "boolean":
            valueType = "checkbox";
            break;
        case "number":
            valueType = "number";
            break;
        default:
            valueType = "text";
    }

    const handleChange = (e) => {
        csvStore.updateCell(
            valueType === "checkbox" ? !value : e.target.value,
            rowData
        );
    };
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
            type={valueType}
            class="form__input"
            checked={value}
            {value}
            on:change={handleChange} />
    {:else}
        <div class="selection-cell" on:click={() => csvStore.selectRow(value)}>
            <h3>{value}</h3>
        </div>
    {/if}
</div>
