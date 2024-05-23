<script>
  import GameCard from "../../components/GameCard.svelte";
  import GameCardAdmin from "../../components/GameCardAdmin.svelte";

  const user = { role: "admin" };
  const games = [
    {
      imageURL: "../../../assets/trackmania.jpg",
      name: "Trackmania",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/",
    },
    {
      imageURL: "../../../assets/trackmania.jpg",
      name: "Trackmania",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/",
    },
    {
      imageURL: "../../../assets/trackmania.jpg",
      name: "Trackmania",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/",
    },
    {
      imageURL: "../../../assets/trackmania.jpg",
      name: "Trackmania",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/",
    },
    {
      imageURL: "../../../assets/trackmania.jpg",
      name: "Trackmania",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/",
    },
    {
      imageURL: "../../../assets/trackmania.jpg",
      name: "Trackmania",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      link: "/",
    },
    
  ];
</script>

<div class="container mt-5">
  <h1>Welcome to Event Tower</h1>
  <p>
    Find active events under every game you can desire. Follow news, chat with like minded souls and and share
    strategies.
  </p>

  <div class="row gx-5 gy-5">
    {#if user.role === "admin"}
      <GameCardAdmin />
    {/if}

    {#each games as game}
      <GameCard {game} />
    {/each}
  </div>
</div>
