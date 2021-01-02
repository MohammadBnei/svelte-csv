import { writable } from 'svelte/store';
import Papa from 'papaparse';

function createLoader() {
    const { subscribe, set } = writable(false)

    const loading = () => set(true)
    const endLoading = () => set(false)

    return {
        subscribe,
        loading,
        endLoading
    }
}

export const loader = createLoader()

export const scrollIndex = writable()

function createCsvReader() {
    const { subscribe, set, update } = writable(null)

    const loadFile = (csvFile) => {
        loader.loading()
        scrollIndex.set(null)
        let columns = null
        let rows = null
        let errors = null
        Papa.parse(csvFile, {
            dynamicTyping: true,
            worker: true,
            header: true,
            step: function ({ data, meta, errors: _errors }) {
                if (!columns) {
                    columns = Object.keys(data).map((key) => ({
                        display: key,
                        dataName: key
                    }))
                    meta.filename = csvFile.name
                    rows = [data]
                    set({ columns, meta, selection: null })
                } else {
                    rows.push(data)
                }
                errors = _errors
            },
            complete: () => {
                for (const error of errors) {
                    console.log(error);
                    rows.splice(error.row, 1)
                }
                update(csv => {
                    csv.rows = rows;
                    return csv
                })
                loader.endLoading()
            }
        })
    }

    const updateCell = (value, rowData) => {
        update(csv => {
            csv.rows[rowData.index][rowData.dataName] = value
            return csv
        })
    }
    const updateHeader = (value, index) => {
        update(csv => {
            csv.columns[index].display = value
            return csv
        })
    }

    const addRow = () => update((csv) => {
        if (csv.selection) {
            csv.rows.splice(csv.selection, 0, [])
            csv.selection++
        } else {
            csv.rows.push([]);
            scrollIndex.set(csv.rows.length - 1)
        }

        return csv
    });

    const removeRow = () => update((csv) => {
        if (csv.selection) {
            csv.rows.splice(csv.selection, 1)
            csv.selection = null
        }

        return csv
    });

    const selectRow = (value) => update(csv => {
        if (value === csv.selection) {
            csv.selection = null;
        } else {
            csv.selection = value;
        }

        return csv
    });

    return {
        subscribe,
        loadFile,
        updateCell,
        updateHeader,
        addRow,
        selectRow,
        removeRow
    }
}

export const csvStore = createCsvReader()