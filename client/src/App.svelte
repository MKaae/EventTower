<script>
  import { onDestroy, onMount } from "svelte";

  import Chat from "./pages/Chat/Chat.svelte"
  import Home from "./pages/Home/Home.svelte";
  import Event from "./pages/Event/Event.svelte";
  import Events from "./pages/Events/Events.svelte";
  import General from "./pages/General/General.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";

  import Leaderboard from "./pages/Leaderboard/Leaderboard.svelte";
  import Authenticate from "./pages/Authenticate/Authenticate.svelte";
  import Stats from "./pages/Stats/Stats.svelte";
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator";
  import {gameTitle, user, eventName} from "../src/stores/generalStore.js";
  import { fetchGet } from "../util/api";
  import toast, {Toaster} from 'svelte-french-toast';

  const logout = async () => {
      try{
        await fetchGet("http://localhost:8080/api/logout");
      } catch (error) {
        console.error(error);
      }
      user.set(null);
      //clear eventstore 
      //redirect fp
      toast.success("Logged out.", {
            position: "bottom-center"
    });
  };

  import { eventStore } from "./stores/generalStore.js";
  import { locationStore } from "./stores/locationStore";

  onMount(async () => {
    locationStore.update();
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
          <Link to={`/events/${eventId}`} class=" mt-3 nav-link active">
              <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
              </svg>
              Event News
            </Link>
            <Link to="/events/{eventId}/chat" class=" mt-3 nav-link active">
              <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
              </svg>
              Chats
            </Link>
            <Link to={`/events/${eventId}/general`} class=" mt-3 nav-link active">
              <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
              </svg>
              General Strategy
            </Link>
            {#if $eventName === "Deep Dip 2"}
              <Link to="/leaderboard" class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                  <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
                </svg>
                Leaderboard
              </Link>
              <Link to="/stats" class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                  <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
                </svg>
                Statistics
              </Link>
            {/if}
          {/if}
          {#if $user === null}
          <Link to="/auth" class=" mt-3 nav-link active">
            <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
              <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
            </svg>
            Login
          </Link>
          {:else}
          <a href="/" on:click|preventDefault={logout} class="mt-3 nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
              <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
            </svg>
            Logout
          </a>
          {/if}
        </li>
      </ul>
    </div>
    <div class="d-flex flex flex-column justify-content-center w-100">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
      <Route path="/auth">
        <div class="d-flex flex-column w-50 align-items-center">        
          <Authenticate />
        </div>
      </Route>
      <Route path="/events/:id">
        <Event />
      </Route>
      <Route path="/events/:id/chat">
        <Chat />
      </Route>
      <Route path="/events/:id/general">
        <General />
      </Route>
      <Route path="/leaderboard">
        <Leaderboard />
      </Route>
      <Route path="/stats">
        <Stats />
      </Route>
    </div>
  </div>
</Router>
<Toaster />
