<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet, fetchPut } from "../../../util/api";
  import { user, eventId } from "../../stores/generalStore.js";

  const params = useParams();

  let event = {};
  let generalBody;
  let isEditing = false;
  let newGeneralBody = "";

  onMount(async () => {
    const currentEventId = $eventId;
    event = await fetchGet(`http://localhost:8080/api/events/${currentEventId}`);
    generalBody = event.general.body;
    newGeneralBody = generalBody;
  });

  const startEditing = () => {
    isEditing = true;
  };

  const saveChanges = async () => {
    isEditing = false;
    generalBody = newGeneralBody;
    try {
      const currentEventId = $eventId;
      await fetchPut(`http://localhost:8080/api/events/${currentEventId}`, {
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
  <h5>Trackmania Strategies</h5>
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
