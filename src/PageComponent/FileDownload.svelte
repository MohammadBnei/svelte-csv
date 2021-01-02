<script>
    import { csvStore, loader } from "../Utils/stores";
    import Papa from "papaparse";

    const downloadCSV = () => {
        loader.loading();
        const csv = Papa.unparse($csvStore.rows, $csvStore.meta);

        const file = new Blob([csv], { type: "text/csv" });

        const filename =
            $csvStore.meta?.filename || new Date().toISOString() + ".csv";

        if (window.navigator.msSaveOrOpenBlob)
            // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }

        loader.endLoading();
    };
</script>

<button on:click={downloadCSV}><strong>Download CSV</strong></button>
