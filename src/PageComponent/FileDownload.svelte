<script>
    import { csvStore, loader } from "../Utils/stores";
    import Papa from "papaparse";

    let csvFile = null;
    let data;

    const unsubscribe = csvStore.subscribe((val) => (data = val));

    const formatData = () => {
        const { columns, rows } = data;

        const reducedRows = rows.reduce((acc, row) => {
            let rowAcc = [];
            for (const { dataIndex } of columns) {
                rowAcc.push(row[dataIndex]);
            }

            acc.push(rowAcc);

            return acc;
        }, []);

        return [columns.map(({ display }) => display), ...reducedRows];
    };

    const downloadCSV = () => {
        loader.loading();
        const csv = Papa.unparse(formatData(), data.meta);

        const file = new Blob([csv], { type: "text/csv" });

        const filename =
            data.meta?.filename || new Date().toISOString() + ".csv";

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

<style>
    button {
        padding: 15px;
        margin: 5px;
    }
</style>

<button on:click={downloadCSV}><strong>Download CSV</strong></button>
