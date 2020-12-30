import { writable } from 'svelte/store';
import Papa from 'papaparse';

let columns = [
    {
        display: "Fruit Name", // What will be displayed as the column header
        dataName: "fruitName", // The key of a row to get the column's data from
        width: 300, // Width, in pixels, of column
    },
    {
        display: "Color", // What will be displayed as the column header
        dataName: "fruitColor", // The key of a row to get the column's data from
        width: 300, // Width, in pixels, of column
    },
    {
        display: "Like", // What will be displayed as the column header
        dataName: "like", // The key of a row to get the column's data from
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
        Papa.parse(csvFile, {
            dynamicTyping: true,
            complete: (results) => {
                const { data, meta } = results
                if (!data.length) return

                const columns = data[0].map((col, index) => ({
                    display: col,
                    dataName: String(index)
                }))

                const rows = []

                for (let i = 1; i < data.length; i++) {
                    const element = data[i];
                    rows.push(element.reduce((acc, cur, index) => {
                        acc[columns[index].dataName] = cur
                        return acc
                    }, {}))
                }

                meta.filename = csvFile.name

                set({ columns, rows, meta })
            }
        })
    }

    const updateCell = (value, rowData) => {
        update(csv => {
            csv.rows[rowData.index][rowData.dataName] = value

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