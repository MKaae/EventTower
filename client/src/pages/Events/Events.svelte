<script>
  import { onMount } from "svelte";
  import { fetchGet, fetchPost } from "../../../util/api";
  import EventCard from "../../components/EventCard.svelte";
  import EventCardAdmin from "../../components/EventCardAdmin.svelte";
  import { gameTitle } from "../../stores/generalStore";
  import toast, {Toaster} from 'svelte-french-toast';

  import { locationStore } from "../../stores/locationStore.js";

  const game = $gameTitle;

  const user = { role: "admin" };
  let eventsList = [];

  $: eventsList;

  onMount(async () => {
    eventsList = await fetchGet(`http://localhost:8080/api/events/game/${game}`);
    locationStore.update();
  });

  async function handleNewEvent(imageURL, game, name, description) {
    try {
      const newEvent = {
        imageURL: imageURL,
        game: game,
        name: name,
        description: description,
      };

      await fetchPost("http://localhost:8080/api/events", newEvent);

      toast.success("Event succesfully created.", {
            position: "bottom-center"
      });
      
      eventsList = await fetchGet(`http://localhost:8080/api/events/game/${game}`);
    } catch (error) {
      toast.error("Error creating event.", {
            position: "bottom-center"
      });
      console.error(error);
    }
  }
</script>

<div class="container mt-5">
  <h1>Discover Exciting Events Across All Your Favorite Games</h1>
  <p>
    Explore a diverse range of active events for every game you love. Stay updated with the latest news,
    connect with fellow enthusiasts, and share strategies to master your gameplay. Join the community and
    enhance your gaming experience!
  </p>
  <div class="row gx-5 gy-5 mt-3">
    {#if user.role === "admin"}
      <EventCardAdmin onNewGame={handleNewEvent} />
    {/if}

    {#each eventsList as event}
      <EventCard {event} />
    {/each}
  </div>
  <Toaster/>
</div>
