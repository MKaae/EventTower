<script>
  export let onNewArticle;

  let title;
  let author;
  let body;
</script>

<div class="m-5 p-5 bg-light border border-3 border-grey rounded shadow">
  <h1>Dummy article title</h1>
  <p>Dummy article body</p>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Create new article
  </button>
</div>

<!-- Modal -->
<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Create new article</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex flex-column">
        <p>Please fill in the details of the news below. Provide Title, author and the article text.</p>
        <input bind:value={title} class="m-1" type="text" placeholder="Title" />
        <input bind:value={author} class="m-1" type="text" placeholder="Author" />
        <input bind:value={body} class="m-1" type="text" placeholder="Body" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button
          on:click={() => onNewArticle(title, author, body)}
          type="button"
          class="btn btn-primary"
          data-bs-dismiss="modal">Create new article</button
        >
      </div>
    </div>
  </div>
</div>
