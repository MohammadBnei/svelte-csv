<script>
    import debounce from "debounce";
    import { csvStore } from "../Utils/stores";
    export let columns;
    let value;

    const handleChange = (index) =>
        debounce(
            () => {
                csvStore.updateHeader(value, index);
            },
            200,
            true
        );
</script>

<style>
    .grid-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 1px black solid;
        height: 100%;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: white;
    }
</style>

<div class="grid-cell">
    <h3>#</h3>
</div>
{#each columns as { display }, index}
    <div class="grid-cell">
        <input
            type="text"
            class="form__input"
            bind:value={display}
            on:change={handleChange(index)} />
    </div>
{/each}
