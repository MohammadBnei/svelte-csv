<script>
  import DataGrid from "./Datagrid/Datagrid.svelte";
  import FileDownLoad from "./PageComponent/FileDownload.svelte";
  import FileUpload from "./PageComponent/FileUpload.svelte";
  import Header from "./PageComponent/Header.svelte";
</script>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 5fr;
    place-items: center;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
</style>

<Header />
<main>
  <div>
    <FileUpload />
    <FileDownLoad />
  </div>
  <DataGrid />
</main>
