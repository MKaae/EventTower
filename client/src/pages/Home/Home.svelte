<script>
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import GameCard from "../../components/GameCard.svelte";
  import { fetchGet, fetchPost } from "../../../util/api.js";
  import { user, BASE_URL } from "../../stores/generalStore.js";
  import GameCardAdmin from "../../components/GameCardAdmin.svelte";

  let gamesList = [];
  $: gamesList;

  onMount(async () => {
    gamesList = await fetchGet($BASE_URL + "/games");
  });

  async function handleNewGame(imageURL, name, description) {
    try {
      const newGame = {
        imageURL: imageURL,
        name: name,
        description: description,
      };

      await fetchPost($BASE_URL + "/games", newGame);

      gamesList = await fetchGet($BASE_URL + "/games");

      toast.success("Success creating new game.", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Error creating new game.", {
        position: "bottom-center",
      });
      console.error("Unable to save game", error);
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
</script>

<div class="container mt-5 m-3">
  <h1>Welcome to Event Tower</h1>
  <p>
    Find active events under every game you can desire. Follow news, chat with like minded souls and and share
    strategies.
  </p>

  <input
    bind:value={searchTerm}
    type="text"
    placeholder="Search..."
    class="border border-3 border-grey rounded shadow"
  />

  <div class="row gx-5 gy-5 mt-3">
    {#if $user === "admin"}
      <GameCardAdmin onNewGame={handleNewGame} />
    {/if}

    {#each searchTerm ? searchGameList : gamesList as game}
      <GameCard {game} />
    {/each}
  </div>
  <Toaster />
</div>
