<script>
  export let game;
</script>

<div class="col-12 col-lg-4 d-flex justify-content-center">
  <div class="card" style="width: 18rem; min-height: 23rem;">
    <img src={game.imageURL} class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">{game.name}</h5>
      <p class="card-text">{game.description}</p>
      <a href="/" class="btn btn-primary align-self-end">See events</a>
    </div>
  </div>
</div>
