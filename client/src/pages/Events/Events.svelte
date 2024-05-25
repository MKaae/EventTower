<script>
  import { onMount } from "svelte";
  import { fetchGet, fetchPost } from "../../../util/api";
  import EventCard from "../../components/EventCard.svelte";
  import EventCardAdmin from "../../components/EventCardAdmin.svelte";

  const user = { role: "admin" };
  let eventsList = [];

  onMount(async () => {
    eventsList = await fetchGet("http://localhost:8080/api/events");
  });

  async function handleNewEvent(imageURL, game, name, description) {
    try {
      const newEvent = {
        imageURL: imageURL,
        game: game,
        name: name,
        description: description,
      };

      // ADD TOAST
      const response = await fetchPost("http://localhost:8080/api/events", newEvent);
    } catch (error) {
      // ERROR TOAST
      console.error(error);
    }
  }
</script>

<div class="container mt-5">
  <h1>Events</h1>
  <div class="row gx-5 gy-5 mt-3">
    {#if user.role === "admin"}
      <EventCardAdmin onNewGame={handleNewEvent} />
    {/if}

    {#each eventsList as event}
      <EventCard {event} />
    {/each}
  </div>
</div>
