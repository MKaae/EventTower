<script>
  import { onMount, setContext } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet } from "../../../util/api.js";
  import { eventPage } from "../../stores/generalStore.js";

  const params = useParams();
  const eventId = $params.id;
  let event = {};

  onMount(async () => {
    event = await fetchGet(`http://localhost:8080/api/events/${eventId}`);
    eventPage.set(true);
  });
</script>

<div class="container mt-5">
  <div class=""><h1>{event.name}</h1></div>
  <div class="d-flex"><h2>News</h2></div>
</div>
