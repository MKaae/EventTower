<script>
  import { Link } from "svelte-navigator";
  import { eventId, gameTitle, user, BASE_URL } from "../stores/generalStore.js";
  import { fetchDelete } from "../../util/api.js";
  import toast, {Toaster} from 'svelte-french-toast';

  export let game;

  function gameStore(){
    gameTitle.set(game.name);
    eventId.set(null);
  };

  async function deleteGame(){
    const currentGame = game?.name;
    try{
      await fetchDelete($BASE_URL + `/game/${currentGame}`);
      toast.success("Game succesfully created.", {
            position: "bottom-center"
      });
    } catch(error) {
      toast.error("Error deleting Article.", {
            position: "bottom-center"
      });
    }
  }
</script>

<div class="col-12 col-lg-4 d-flex justify-content-center">
  <div class="card border border-3 border-grey rounded shadow" style="width: 18rem; min-height: 23rem;">
    <img src={game?.imageURL} class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">{game?.name}</h5>
      <p class="card-text">{game?.description}</p>
      <div class="d-flex flex-row">
        {#if $user === "admin"}
        <button class="btn btn-primary m-2" on:click={deleteGame}>Delete event</button>
        {/if}
        <Link to={`/events`} on:click={gameStore} class="btn btn-primary m-2">See events</Link>
      </div>
    </div>
  </div>
</div>
<Toaster />
