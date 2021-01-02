<script>
  import DataGrid from "./Datagrid/Datagrid.svelte";
  import FileDownLoad from "./PageComponent/FileDownload.svelte";
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
    width: 100vw;
    justify-content: center;
  }

  section {
    width: 95vw;
    box-shadow: 5px 10px 5px gray;
  }

  :global(button, input) {
    padding: 15px;
    border-radius: 5px;
    border: none;
  }
</style>

<Header />
<main>
  <div class="file">
    <FileUpload />
    <CsvActions />
  </div>
  <section>
    <DataGrid />
  </section>
</main>
