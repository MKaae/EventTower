<script>
  import { Link } from "svelte-navigator";
  import { eventId, gameTitle } from "../stores/generalStore.js";

  export let game;

  function gameStore(){
    gameTitle.set(game.name);
    eventId.set(null);
  };
</script>

<div class="col-12 col-lg-4 d-flex justify-content-center">
  <div class="card border border-3 border-grey rounded shadow" style="width: 18rem; min-height: 23rem;">
    <img src={game?.imageURL} class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">{game?.name}</h5>
      <p class="card-text">{game?.description}</p>
      <Link to={`/events`} on:click={gameStore} class="btn btn-primary align-self-end">See events</Link>
    </div>
  </div>
</div>
