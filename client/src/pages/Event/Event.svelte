<script>
  import { onMount, setContext } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet } from "../../../util/api.js";
  import { eventPage } from "../../stores/generalStore.js";
  import { eventStore } from "../../stores/generalStore.js";
  import { locationStore } from "../../stores/locationStore.js";

  const params = useParams();
  const eventId = $params.id;
  let event = {};


  

  onMount(async () => {
    event = await fetchGet(`http://localhost:8080/api/events/${eventId}`);
    eventPage.set(true);
    eventStore.set({ id: event._id });
    locationStore.update();
    console.log($locationStore);

  });
</script>

<div class="container mt-5">
  <div class=""><h1>{event.name}</h1></div>
  <div class=""><h2>News</h2></div>
</div>
