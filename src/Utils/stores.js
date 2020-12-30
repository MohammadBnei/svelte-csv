import { writable } from 'svelte/store';
import Papa from 'papaparse';

let columns = [
    {
        display: "Fruit Name", // What will be displayed as the column header
        dataIndex: "fruitName", // The key of a row to get the column's data from
        width: 300, // Width, in pixels, of column
    },
    {
        display: "Color", // What will be displayed as the column header
        dataIndex: "fruitColor", // The key of a row to get the column's data from
        width: 300, // Width, in pixels, of column
    },
    {
        display: "Like", // What will be displayed as the column header
        dataIndex: "like", // The key of a row to get the column's data from
        width: 250, // Width, in pixels, of column
    },
];
let rows = [
    {
        fruitName: "Apple",
        fruitColor: "Red",
        like: false
    },
    {
        fruitName: "Blueberry",
        fruitColor: "Blue",
        like: true
    },
    {
        fruitName: "Tomato",
        fruitColor: "Red",
        like: false
    },
];

function createCsvReader() {
    const { subscribe, set, update } = writable({ columns, rows })

    const loadFile = (csvFile) => {
        let columns = []
        let rows = []
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
                    rows.push(data)
                }
            },
            complete: () => {
                console.log('Load Completed', rows);
                update(csv => { csv.rows = rows; return csv })
            }
        })
    }

    const updateCell = (value, rowData) => {
        update(csv => {
            csv.rows[rowData.index][rowData.dataIndex] = value
            return csv
        })
    }

    return {
        subscribe,
        loadFile,
        updateCell
    }
}

export const csvStore = createCsvReader()