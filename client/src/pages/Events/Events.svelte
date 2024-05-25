<script>
  import { onMount } from "svelte";
  import EventCard from "../../components/EventCard.svelte";
  import { fetchGet } from "../../../util/api";

  let eventsList = [];

  onMount(async () => {
    eventsList = await fetchGet("http://localhost:8080/api/events");
    console.log(eventsList);
  });
</script>

<div class="container mt-5">
  <h1>Events</h1>
  <div class="row gx-5 gy-5 mt-3">
    {#each eventsList as event}
      <EventCard {event} />
    {/each}
  </div>
</div>
