<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet, fetchPut } from "../../../util/api";
  import { locationStore } from "../../stores/locationStore";
  import { user } from "../../stores/generalStore.js";

  const params = useParams();
  const eventId = $params.id;

  let event = {};
  let generalBody;
  let isEditing = false;
  let newGeneralBody = "";

  onMount(async () => {
    event = await fetchGet(`http://localhost:8080/api/events/${eventId}`);
    generalBody = event.general.body;
    newGeneralBody = generalBody;
    locationStore.update();
  });

  const startEditing = () => {
    isEditing = true;
  };

  const saveChanges = async () => {
    isEditing = false;
    generalBody = newGeneralBody;
    try {
      await fetchPut(`http://localhost:8080/api/events/${eventId}`, {
        ...event,
        general: {
          ...event.general,
          body: generalBody,
        },
      });
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };
</script>

<div class="container mt-4 m-2">
  {#if isEditing}
    <button class="btn btn-primary mb-3" on:click={saveChanges}>Save</button>

    <div class="mb-3">
      <textarea class="form-control" rows="10" bind:value={newGeneralBody}></textarea>
    </div>
  {:else}
    {#if $user === "admin"}
      <button class="btn btn-secondary" on:click={startEditing}>Edit</button>
    {/if}
    <div class="mb-3 m-3 p-2 bg-light border border-3 border-grey rounded shadow">
      {@html generalBody}
    </div>
  {/if}
</div>
