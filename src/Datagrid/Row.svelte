<script>
    import debounce from "debounce";
    import { csvStore } from "../Utils/stores";
    export let rowData;
    export let value = "";

    $: value = value;

    const handleChange = debounce(() => {
        csvStore.updateCell(value, rowData)
    }, 200, true)
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
        margin: 0 auto;
        padding: 1.5rem 2rem;
        border-radius: 0.2rem;
        background-color: rgb(255, 255, 255);
        border: none;
        width: 90%;
        display: block;
        border-bottom: 0.3rem solid transparent;
        transition: all 0.3s;
    }
</style>


<div class="grid-cell">
    <input type="text" class="form__input" bind:value={value} on:change={handleChange}/>
</div>
