<script>
    import JellyfishLoader from "./JellyfishLoader.svelte";
</script>

<style>
    .header {
        background: #1abc9c;

        display: flex;
        justify-items: center;
        align-items: center;
    }

    h1 {
        padding: 2rem;
        text-align: center;
        color: white;
        font-size: 40px;
        font-weight: 600;
        flex-grow: 1;
    }

    .side-item {
        width: 100px;
    }
</style>

<div class="header">
    <div class="side-item" />
    <h1>Svelte csv reader</h1>
    <div class="side-item">
        <JellyfishLoader />
    </div>
</div>
