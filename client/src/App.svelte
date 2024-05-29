<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../util/api";
  import Chat from "./pages/Chat/Chat.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Event from "./pages/Event/Event.svelte";
  import Stats from "./pages/Stats/Stats.svelte";
  import Events from "./pages/Events/Events.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import General from "./pages/General/General.svelte";
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Leaderboard from "./pages/Leaderboard/Leaderboard.svelte";
  import Authenticate from "./pages/Authenticate/Authenticate.svelte";
  import { user, eventName, eventId, BASE_URL, gameTitle } from "../src/stores/generalStore.js";

  let currentId = $eventId;

  const logout = async () => {
    try {
      await fetchGet($BASE_URL + "/logout");
    } catch (error) {
      console.error(error);
    }
    user.set(null);
    eventId.set(null);
    toast.success("Logged out.", {
      position: "bottom-center",
    });
  };

  onMount(async () => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  let showNavbar = true;

  const handleResize = () => {
    showNavbar = window.innerWidth >= 768;
  };

  const toggleNavbar = () => {
    showNavbar = !showNavbar;
  };
</script>

<Router>
  <div class="d-flex flex-row">
    {#if showNavbar === false}
      <button
        on:click={toggleNavbar}
        class="btn btn-primary"
        style="min-width: 50px; width: 50px min-height: 50px; height: 50px"
      >
        <svg fill="none" viewBox="0 0 18 18" stroke="currentColor" style="width: 75%; height: 75%;">
          <path d="M3 12h18M3 6h18M3 18h18"></path>
        </svg>
      </button>
    {/if}
    {#if showNavbar === true}
      <div
        class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border border-3 border-grey rounded shadow"
        style="width: 280px; min-height:100vh"
      >
        <a href="/" class="d-flex align-items-center link-body-emphasis text-decoration-none">
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
            {#if $gameTitle !== null}
              <Link to="/events" class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                  <path
                    d="M17.659,9.597h-1.224c-0.199-3.235-2.797-5.833-6.032-6.033V2.341c0-0.222-0.182-0.403-0.403-0.403S9.597,2.119,9.597,2.341v1.223c-3.235,0.2-5.833,2.798-6.033,6.033H2.341c-0.222,0-0.403,0.182-0.403,0.403s0.182,0.403,0.403,0.403h1.223c0.2,3.235,2.798,5.833,6.033,6.032v1.224c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403v-1.224c3.235-0.199,5.833-2.797,6.032-6.032h1.224c0.222,0,0.403-0.182,0.403-0.403S17.881,9.597,17.659,9.597 M14.435,10.403h1.193c-0.198,2.791-2.434,5.026-5.225,5.225v-1.193c0-0.222-0.182-0.403-0.403-0.403s-0.403,0.182-0.403,0.403v1.193c-2.792-0.198-5.027-2.434-5.224-5.225h1.193c0.222,0,0.403-0.182,0.403-0.403S5.787,9.597,5.565,9.597H4.373C4.57,6.805,6.805,4.57,9.597,4.373v1.193c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403V4.373c2.791,0.197,5.026,2.433,5.225,5.224h-1.193c-0.222,0-0.403,0.182-0.403,0.403S14.213,10.403,14.435,10.403"
                    fill="currentColor"
                  />
                </svg>
                Events
              </Link>
            {/if}
            {#if $eventId !== null}
              <Link to={`/events/news`} class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                  <path
                    d="M18.175,4.142H1.951C1.703,4.142,1.5,4.344,1.5,4.592v10.816c0,0.247,0.203,0.45,0.451,0.45h16.224c0.247,0,0.45-0.203,0.45-0.45V4.592C18.625,4.344,18.422,4.142,18.175,4.142 M4.655,14.957H2.401v-1.803h2.253V14.957zM4.655,12.254H2.401v-1.803h2.253V12.254z M4.655,9.549H2.401V7.747h2.253V9.549z M4.655,6.846H2.401V5.043h2.253V6.846zM14.569,14.957H5.556V5.043h9.013V14.957z M17.724,14.957h-2.253v-1.803h2.253V14.957z M17.724,12.254h-2.253v-1.803h2.253V12.254zM17.724,9.549h-2.253V7.747h2.253V9.549z M17.724,6.846h-2.253V5.043h2.253V6.846z"
                    fill="currentColor"
                  />
                </svg>
                Event News
              </Link>
              <Link to={`/events/chat`} class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                  <path
                    d="M17.211,3.39H2.788c-0.22,0-0.4,0.18-0.4,0.4v9.614c0,0.221,0.181,0.402,0.4,0.402h3.206v2.402c0,0.363,0.429,0.533,0.683,0.285l2.72-2.688h7.814c0.221,0,0.401-0.182,0.401-0.402V3.79C17.612,3.569,17.432,3.39,17.211,3.39M16.811,13.004H9.232c-0.106,0-0.206,0.043-0.282,0.117L6.795,15.25v-1.846c0-0.219-0.18-0.4-0.401-0.4H3.189V4.19h13.622V13.004z"
                    fill="currentColor"
                  />
                </svg>
                Chats
              </Link>
              <Link to={`/events/general`} class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                  <path
                    d="M6.176,7.241V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.221,0-0.403,0.181-0.403,0.402v0.461C4.79,7.416,4.365,7.955,4.365,8.591c0,0.636,0.424,1.175,1.006,1.35v3.278c0,0.222,0.182,0.402,0.403,0.402c0.222,0,0.402-0.181,0.402-0.402V9.941c0.582-0.175,1.006-0.714,1.006-1.35C7.183,7.955,6.758,7.416,6.176,7.241 M5.774,9.195c-0.332,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C6.377,8.923,6.105,9.195,5.774,9.195 M10.402,10.058V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.222,0-0.402,0.181-0.402,0.402v3.278c-0.582,0.175-1.006,0.714-1.006,1.35c0,0.637,0.424,1.175,1.006,1.351v0.461c0,0.222,0.181,0.402,0.402,0.402c0.221,0,0.402-0.181,0.402-0.402v-0.461c0.582-0.176,1.006-0.714,1.006-1.351C11.408,10.772,10.984,10.233,10.402,10.058M10,12.013c-0.333,0-0.604-0.272-0.604-0.604S9.667,10.805,10,10.805c0.332,0,0.604,0.271,0.604,0.604S10.332,12.013,10,12.013M14.629,8.448V6.78c0-0.221-0.182-0.402-0.403-0.402c-0.221,0-0.402,0.181-0.402,0.402v1.668c-0.581,0.175-1.006,0.714-1.006,1.35c0,0.636,0.425,1.176,1.006,1.351v2.07c0,0.222,0.182,0.402,0.402,0.402c0.222,0,0.403-0.181,0.403-0.402v-2.07c0.581-0.175,1.006-0.715,1.006-1.351C15.635,9.163,15.21,8.624,14.629,8.448 M14.226,10.402c-0.331,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C14.83,10.13,14.558,10.402,14.226,10.402 M17.647,3.962H2.353c-0.221,0-0.402,0.181-0.402,0.402v11.27c0,0.222,0.181,0.402,0.402,0.402h15.295c0.222,0,0.402-0.181,0.402-0.402V4.365C18.05,4.144,17.869,3.962,17.647,3.962 M17.245,15.232H2.755V4.768h14.49V15.232z"
                    fill="currentColor"
                  />
                </svg>
                General Strategy
              </Link>
              {#if $eventName === "Deep Dip 2"}
                <Link to="/leaderboard" class=" mt-3 nav-link active">
                  <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                    <path
                      d="M15.396,2.292H4.604c-0.212,0-0.385,0.174-0.385,0.386v14.646c0,0.212,0.173,0.385,0.385,0.385h10.792c0.211,0,0.385-0.173,0.385-0.385V2.677C15.781,2.465,15.607,2.292,15.396,2.292 M15.01,16.938H4.99v-2.698h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.519,1.156-1.156s-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.321-1.089,0.771H4.99v-3.083h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.518,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V6.531h1.609C6.755,6.98,7.185,7.302,7.688,7.302c0.638,0,1.156-0.519,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V3.062h10.02V16.938z M7.302,13.854c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386s-0.173,0.385-0.385,0.385S7.302,14.066,7.302,13.854 M7.302,10c0-0.212,0.173-0.385,0.385-0.385S8.073,9.788,8.073,10s-0.173,0.385-0.385,0.385S7.302,10.212,7.302,10 M7.302,6.146c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386S7.899,6.531,7.688,6.531S7.302,6.358,7.302,6.146"
                      fill="currentColor"
                    />
                  </svg>
                  Leaderboard
                </Link>
                <Link to="/stats" class=" mt-3 nav-link active">
                  <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                    <path
                      d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"
                      fill="currentColor"
                    />
                  </svg>
                  Statistics
                </Link>
              {/if}
            {/if}
            {#if $user === null}
              <Link to="/auth" class=" mt-3 nav-link active">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                  <path
                    d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                    fill="currentColor"
                  />
                </svg>
                Login
              </Link>
            {:else}
              <a href="/" on:click|preventDefault={logout} class="mt-3 nav-link active" aria-current="page">
                <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                  <path
                    d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
                    fill="currentColor"
                  />
                </svg>
                Logout
              </a>
            {/if}
            <button
              on:click={toggleNavbar}
              class="mt-3 nav-link active w-100"
              style="cursor: pointer; text-align: left;"
            >
              <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 18 18">
                <path
                  d="M18.092,5.137l-3.977-1.466h-0.006c0.084,0.042-0.123-0.08-0.283,0H13.82L10,5.079L6.178,3.671H6.172c0.076,0.038-0.114-0.076-0.285,0H5.884L1.908,5.137c-0.151,0.062-0.25,0.207-0.25,0.369v10.451c0,0.691,0.879,0.244,0.545,0.369l3.829-1.406l3.821,1.406c0.186,0.062,0.385-0.029,0.294,0l3.822-1.406l3.83,1.406c0.26,0.1,0.543-0.08,0.543-0.369V5.506C18.342,5.344,18.242,5.199,18.092,5.137 M5.633,14.221l-3.181,1.15V5.776l3.181-1.15V14.221z M9.602,15.371l-3.173-1.15V4.626l3.173,1.15V15.371z M13.57,14.221l-3.173,1.15V5.776l3.173-1.15V14.221z M17.547,15.371l-3.182-1.15V4.626l3.182,1.15V15.371z"
                  fill="currentColor"
                />
              </svg>
              Close Nav Bar
            </button>
          </li>
        </ul>
      </div>
    {/if}
    <div class="d-flex flex flex-column justify-content-center w-100">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
      <Route path="/auth">
        <Authenticate />
      </Route>
      <PrivateRoute path="/events/news">
        <Event />
      </PrivateRoute>
      <Route path="/events/chat">
        <Chat />
      </Route>
      <PrivateRoute path="/events/general">
        <General />
      </PrivateRoute>
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
