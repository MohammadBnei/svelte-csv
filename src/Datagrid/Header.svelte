<script>
    import debounce from "lodash.debounce";
    import { csvStore } from "../Utils/stores";
    let value;

    const handleChange = (index) =>
        debounce(() => {
            csvStore.updateHeader(value, index);
        }, 200);
</script>

<style>
    .grid-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 1px black solid;
        height: 100%;
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: white;
    }
    .form__input {
        font-weight: bold;
        text-align: center;
    }
</style>

<div class="grid-cell">
    <h3># ({$csvStore.rows.length})</h3>
</div>
{#each $csvStore.columns as { display }, index}
    <div class="grid-cell">
        <input
            type="text"
            class="form__input"
            bind:value={display}
            on:change={handleChange(index)} />
    </div>
{/each}
