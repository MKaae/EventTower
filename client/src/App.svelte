<script>
  import Home from "./pages/Home/Home.svelte";
  import Events from "./pages/Events/Events.svelte";
  import Leaderboard from "./pages/Leaderboard/Leaderboard.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Authenticate from "./pages/Authenticate/Authenticate.svelte";
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator";
  import {user} from "../src/stores/generalStore.js";
  import { fetchPost } from "../util/api";
  import toast, {Toaster} from 'svelte-french-toast';

  const logout = async () => {
    const userBody = { user: $user};
    if($user != null){
      try{
        await fetchPost("http://localhost:8080/api/logout", userBody);
      } catch (error) {
        toast.error("Error logging out try again.", {
          position: "bottom-center"
        });
      }
    } else {
      user.set(null);
    }
    if($user == null){
      toast.success("Logged out.", {
            position: "bottom-center"
      });
    }
  };
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
          <Link to="/" class="nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
              <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
            </svg>
            Home
          </Link>
          <Link to="/events" class=" mt-3 nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
              <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor" />
            </svg>
            Events
          </Link>
          {#if $user}
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
    <div class="d-flex flex flex-column justify-content-center">
      <Route path="/">
        <!-- Text components here with commenting in and out -->
        <Authenticate />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
      <!-- <Route path="/leaderboard/:id"> <Leaderboard /> </Route> -->
      <!-- <PrivateRoute path="/chatroom"></PrivateRoute> -->
    </div>
  </div>
</Router>
<Toaster />
