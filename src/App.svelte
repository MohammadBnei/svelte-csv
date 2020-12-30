<script>
  import DataGrid from "./Datagrid/Datagrid.svelte";
import Header from "./PageComponent/Header.svelte";

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
  ];
  let rows = [
    {
      fruitName: "Apple",
      fruitColor: "Red",
    },
    {
      fruitName: "Blueberry",
      fruitColor: "Blue",
    },
    {
      fruitName: "Tomato",
      fruitColor: "Red",
    },
  ];
</script>

<Header />
<div>
  <DataGrid {rows} {columns} />
</div>
