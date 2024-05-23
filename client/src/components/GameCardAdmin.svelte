<script>
  export let onNewGame;

  let imageURL;
  let name;
  let description;
</script>

<div class="col-12 col-lg-4 d-flex justify-content-center">
  <div class="card" style="width: 18rem; min-height: 23rem;">
    <img
      src="https://i0.wp.com/godstedlund.dk/wp-content/uploads/2023/04/placeholder-5.png"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">Create new game</h5>
      <p class="card-text">
        This placeholder card shows where your new game will appear. Click "Create a New Game" get started.
      </p>
      <a href="/" class="btn btn-primary align-self-end" data-bs-toggle="modal" data-bs-target="#exampleModal"
        >Create new game</a
      >
    </div>
  </div>
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
        <h5 class="modal-title" id="exampleModalLabel">Create new game</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex flex-column">
        <p>
          Please fill in the details below to add a new game to our collection. Provide the image URL, name,
          and a brief description to get started.
        </p>
        <input bind:value={imageURL} class="m-1" type="text" placeholder="Add image URL" />
        <input bind:value={name} class="m-1" type="text" placeholder="Add name" />
        <input bind:value={description} class="m-1" type="text" placeholder="Add description" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button
          on:click={() => onNewGame(imageURL, name, description)}
          type="button"
          class="btn btn-primary"
          data-bs-dismiss="modal">Create game</button
        >
      </div>
    </div>
  </div>
</div>