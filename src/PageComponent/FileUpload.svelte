<script>
    import { createEventDispatcher } from "svelte";
    import { csvStore, loader } from "../Utils/stores";
    export let multiple = false;
    let dragging = false;
    const dispatch = createEventDispatcher();

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
        loader.loading();
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
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
    }
    .slot {
        padding: 20px;
        border: 1px solid gray;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .upload {
        width: 50%;
        margin: auto;
    }
</style>

<div class="upload">
    <label
        class:dragging
        on:drop|preventDefault={onFile(getFilesFromDropEvent)}
        on:dragover|preventDefault={startDragging}
        on:dragleave|preventDefault={stopDragging}>
        <slot {dragging}>
            <div class="slot">
                Drag &amp; Drop your file(s) or
                <strong>browse.</strong>
            </div>
        </slot>
        <input
            type="file"
            {multiple}
            on:input={onFile(getFilesFromInputEvent)}
            accept=".csv" />
    </label>
</div>
