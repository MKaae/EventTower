<script>
  import { Link } from "svelte-navigator";

  export let event;
</script>

<div class="col-12 col-lg-4 d-flex justify-content-center">
  <div class="card" style="width: 18rem; min-height: 23rem;">
    <img src={event?.imageURL} class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">{event?.name}</h5>
      <p class="card-text">{event?.description}</p>
      <Link to={`/events/${event._id}`} class="btn btn-primary align-self-end">See event</Link>
    </div>
  </div>
</div>
