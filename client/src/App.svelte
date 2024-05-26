<script>
  import { onDestroy, onMount } from "svelte";

  import Home from "./pages/Home/Home.svelte";
  import Events from "./pages/Events/Events.svelte";
  import Leaderboard from "./pages/Leaderboard/Leaderboard.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Event from "./pages/Event/Event.svelte";
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator";
  import { eventStore } from "./stores/generalStore.js";
  import { locationStore } from "./stores/locationStore";

  onMount(async () => {
    locationStore.update();
    console.log($locationStore);
  });

  let eventId;
  const unsubscribe = eventStore.subscribe((event) => {
    eventId = event.id;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<Router>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span class="fs-4">Eventtower</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <Link to="/" class="nav-link active">
            <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
              <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
            </svg>
            Home
          </Link>
          <Link to="/events" class=" mt-3 nav-link active">
            <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
              <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
            </svg>
            Events
          </Link>
          {#if $locationStore.pathname.includes("/events/")}
            <Link to={`events/${eventId}`} class=" mt-3 nav-link active">
              <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
              </svg>
              Event
            </Link>
          {/if}
        </li>
      </ul>
    </div>
    <div class="d-flex flex flex-column">
      <Route path="/">
        <!-- Text components here with commenting in and out -->
        <Home />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
      <Route path="/events/:id">
        <Event />
      </Route>
      <!-- <Route path="/leaderboard/:id"> <Leaderboard /> </Route> -->
      <!-- <PrivateRoute path="/chatroom"></PrivateRoute> -->
    </div>
  </div>
</Router>
