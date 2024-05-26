<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet } from "../../../util/api";
  import { locationStore } from "../../stores/locationStore";

  const params = useParams();
  const eventId = $params.id;
  const user = { role: "admin" };
  let event = {};
  let generalBody;
  
  onMount(async () => {
    event = await fetchGet(`http://localhost:8080/api/events/${eventId}`);
    generalBody = event.general.body;
    locationStore.update();
  });
</script>

<div class="container">
  <h1>General Strategy</h1>
  {@html generalBody}
</div>
