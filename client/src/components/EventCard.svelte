<script>
  import { Link } from "svelte-navigator";
  import { eventName, eventId, user, BASE_URL } from "../stores/generalStore.js";
  import { fetchDelete } from "../../util/api.js";
  import toast, {Toaster} from 'svelte-french-toast';

  export let event;

  function setEventName(){
    eventName.set(event.name);
    eventId.set(event._id);
  }

  async function deleteEvent(){
    const eventIdForCard = event?._id;
    try{
      await fetchDelete($BASE_URL + `/events/${eventIdForCard}`);
      toast.success("Article succesfully created.", {
            position: "bottom-center"
      });
    } catch (error) {
      toast.error("Error creating Article.", {
            position: "bottom-center"
      });
    }
  }
</script>

<div class="col-12 col-lg-4 d-flex justify-content-center">
  <div class="card border border-3 border-grey rounded shadow" style="width: 18rem; min-height: 23rem;">
    <img src={event?.imageURL} class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">{event?.name}</h5>
      <p class="card-text">{event?.description}</p>
      <div class="d-flex flex-row">
        {#if $user === "admin"}
        <button class="btn btn-primary m-2" on:click={deleteEvent}>Delete event</button>
        {/if}
        <Link to={`/events/news`} on:click={setEventName} class="btn btn-primary m-2">See event</Link>
      </div>
    </div>
  </div>
</div>
<Toaster />
