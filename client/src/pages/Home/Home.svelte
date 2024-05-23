<script>
  import GameCard from "../../components/GameCard.svelte";
  import GameCardAdmin from "../../components/GameCardAdmin.svelte";
  import { fetchGet, fetchPost } from "../../../util/api.js";
  import { onMount } from "svelte";

  const user = { role: "admin" };
  let games = [];

  onMount(async () => {
    games = await fetchGet("http://localhost:8080/api/games");
  });

  async function handleNewGame(imageURL, name, description) {
    try {
      const newGame = {
        imageURL: imageURL,
        name: name,
        description: description,
      };

      await fetchPost("http://localhost:8080/api/games", newGame);
    } catch (error) {
      console.error("Unable to save game", error);
    }
  }
</script>

<div class="container mt-5">
  <h1>Welcome to Event Tower</h1>
  <p>
    Find active events under every game you can desire. Follow news, chat with like minded souls and and share
    strategies.
  </p>

  <div class="row gx-5 gy-5">
    {#if user.role === "admin"}
      <GameCardAdmin onNewGame={handleNewGame} />
    {/if}

    {#each games as game}
      <GameCard {game} />
    {/each}
  </div>
</div>
