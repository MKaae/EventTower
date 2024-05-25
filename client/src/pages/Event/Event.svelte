<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet } from "../../../util/api.js";

  const params = useParams();
  const eventId = $params.id;
  console.log($params.id);
  let event = {};

  onMount(async () => {
    event = await fetchGet(`http://localhost:8080/api/events/${eventId}`);
    console.log(event);
  });
</script>

<div class="container"><h1>Hello World</h1></div>
