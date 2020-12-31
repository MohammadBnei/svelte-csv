<script>
    export let columns;
</script>

<style>
    .grid-cell {
        text-align: center;
        border: 1px black solid;
        padding: 1rem;
        height: 100%;
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: white;
    }
</style>

<h3 class="grid-cell">#</h3>
{#each columns as { display }, index}
    <div class="grid-cell">
        <h3>{display}</h3>
    </div>
{/each}
