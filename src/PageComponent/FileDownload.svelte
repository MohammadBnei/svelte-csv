<script>
    import { csvStore, loader } from "../Utils/stores";
    import Papa from "papaparse";

    const downloadCSV = async () => {
        loader.loading();
        const csv = await new Promise((resolve) => {
            const rows = $csvStore.rows.map((row) => {
                /**
                 * Since the column name remapping doe not impact the display name,
                 * we need to address that before proceding to the unparsing
                */
                for (const key of Object.keys(row)) {
                    const column = $csvStore.columns.find(
                        ({ dataName }) => dataName === key
                    );
                    if (column?.display !== column.dataName) {
                        row[column.display] = row[key];
                        delete row[key];
                    }
                }

                return row;
            });

            /**
             * Used to maintain the column order
             */
            const columns = $csvStore.columns.reduce((acc, cur) => {
                acc.push(cur.display);
                return acc;
            }, []);
            const csv = Papa.unparse(rows, { ...$csvStore.meta, columns });

            resolve(csv);
        });

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
