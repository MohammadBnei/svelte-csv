<script>
    import { createEventDispatcher, onDestroy } from "svelte";
    import { csvStore, loader } from "../Utils/stores";
    export let multiple = false;
    let dragging = false;
    const dispatch = createEventDispatcher();

    let currentFileName = null;

    const unsubscribe = csvStore.subscribe(val => currentFileName = val.meta?.filename || null )

    onDestroy(() => unsubscribe())

    function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
        return files.length
            ? [...files]
            : items
                  .filter(({ kind }) => kind === "file")
                  .map(({ getAsFile }) => getAsFile());
    }

    function getFilesFromInputEvent({ target }) {
        const files = target.files ? [...target.files] : [];
        target.value = "";
        return files;
    }

    function startDragging() {
        dragging = true;
    }
    function stopDragging() {
        dragging = false;
    }
    const onFile = (getFilesFunction) => (event) => {
        stopDragging();
        loader.loading()
        const files = getFilesFunction(event);
        if (files.length) {
            const csvFiles = multiple ? files : files[0];
            dispatch("input", { files: csvFiles });
            csvStore.loadFile(csvFiles);
        }
    };
</script>

<style>
    input {
        width: 100%;
        height: 100%;
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
    }
    div {
        padding: 20px;
    }
    label:hover {
        cursor: pointer;
    }
</style>

<label
    class:dragging
    on:drop|preventDefault={onFile(getFilesFromDropEvent)}
    on:dragover|preventDefault={startDragging}
    on:dragleave|preventDefault={stopDragging}>
    <slot {dragging}>
        <div>Drag &amp; Drop your file(s) or <strong>browse.</strong></div>
    </slot>
    <input
        type="file"
        {multiple}
        on:input={onFile(getFilesFromInputEvent)}
        accept=".csv" />
</label>
