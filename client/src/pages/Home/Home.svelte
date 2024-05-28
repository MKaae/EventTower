<script>
  import { onMount } from "svelte";
  import GameCard from "../../components/GameCard.svelte";
  import { fetchGet, fetchPost } from "../../../util/api.js";
  import GameCardAdmin from "../../components/GameCardAdmin.svelte";
  import toast, {Toaster} from 'svelte-french-toast';

  const user = { role: "admin" };
  let gamesList = [];

  $: gamesList;

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

      toast.success("Success creating new game.", {
            position: "bottom-center"
      });

      await fetchPost("http://localhost:8080/api/games", newGame);
    } catch (error) {
      toast.error("Error creating new game.", {
            position: "bottom-center"
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
  <Toaster/>
</div>
