<script>
  import DataGrid from "./Datagrid/Datagrid.svelte";
  import FileUpload from "./PageComponent/FileUpload.svelte";
  import CsvActions from "./PageComponent/CsvActions.svelte";
  import Header from "./PageComponent/Header.svelte";
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  .file {
    display: flex;
    flex-direction: column;
    gap: 3px;
    justify-content: center;
    width: 100%;
    margin: 5px;
  }
  :global(button, input) {
    padding: 15px;
    border-radius: 5px;
    border: none;
    background-color: #1abc9c;
    color: white;
    cursor: pointer;
  }
</style>

<Header />
<main>
  <div class="file">
    <FileUpload />
    <CsvActions />
  </div>
    <DataGrid />
</main>
