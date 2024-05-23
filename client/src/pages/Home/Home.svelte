<script>
  import GameCard from "../../components/GameCard.svelte";
  import GameCardAdmin from "../../components/GameCardAdmin.svelte";
  import { fetchGet, fetchPost } from "../../../util/api.js";
  import { onMount } from "svelte";
  // import bootstrap from "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

  const user = { role: "admin" };
  let gamesList = [];

  onMount(async () => {
    gamesList = await fetchGet("http://localhost:8080/api/games");
  });

  async function handleNewGame(imageURL, name, description) {
    try {
      const newGame = {
        imageURL: imageURL,
        name: name,
        description: description,
      };

      // NOTHING HAPPENS AFTER FETCH
      // THEREFORE showToast IS ABOVE
      // showToast("Game succesfully created.");

      const response = await fetchPost("http://localhost:8080/api/games", newGame);
    } catch (error) {
      console.error("Unable to save game", error);
      // showToast("Unable to save game.");
    }
  }

  let searchTerm;
  let searchGameList = [];

  $: if (searchTerm !== null) {
    searchGameList = gamesList.filter((game) => {
      return (
        game.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        game.description?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });
  }

  let message;

  // function showToast(data) {
  //   message = data;
  //   console.log(message);

  //   const toastElement = document.getElementById("liveToast");
  //   const toast = new bootstrap.Toast(toastElement);
  //   toast.show();
  // }
</script>

<div class="container mt-5">
  <h1>Welcome to Event Tower</h1>
  <p>
    Find active events under every game you can desire. Follow news, chat with like minded souls and and share
    strategies.
  </p>
  
  <input bind:value={searchTerm} type="text" placeholder="Search..." />

  <div class="row gx-5 gy-5 mt-3">
    {#if user.role === "admin"}
      <GameCardAdmin onNewGame={handleNewGame} />
    {/if}

    {#each searchTerm ? searchGameList : gamesList as game}
      <GameCard {game} />
    {/each}
  </div>
</div>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Information</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">{message}</div>
  </div>
</div>
