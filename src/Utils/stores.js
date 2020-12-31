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

function createCsvReader() {
    const { subscribe, set, update } = writable({})

    const loadFile = (csvFile) => {
        loader.loading()
        let columns = []
        let meta = null
        Papa.parse(csvFile, {
            dynamicTyping: true,
            worker: true,
            step: function (row) {
                const { data } = row

                if (!columns.length) {
                    columns = data.map((col, index) => ({
                        display: col,
                        dataIndex: index
                    }))
                    meta = row.meta
                    meta.filename = csvFile.name
                    set({ columns, meta, rows: [] })
                } else {
                    update(csv => { csv.rows.push(data); return csv })
                }
            },
            complete: () => {
                loader.endLoading()
            }
        })
    }

    const updateCell = (value, rowData) => {
        update(csv => {
            csv.rows[rowData.index][rowData.dataIndex] = value
            return csv
        })
    }
    const updateHeader = (value, index) => {
        update(csv => {
            csv.columns[index].display = value
            return csv
        })
    }

    return {
        subscribe,
        loadFile,
        updateCell,
        updateHeader
    }
}

export const csvStore = createCsvReader()