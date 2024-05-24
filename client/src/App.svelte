<script>
  import Home from "./pages/Home/Home.svelte";
  import Leaderboard from "./pages/Leaderboard/Leaderboard.svelte";
  // @ts-ignore
  import { Router, Link, Route } from "svelte-navigator"; 

</script>
<Router>
  <div class="d-flex flex-row">
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <span class="fs-4">Eventtower</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <Link to="/" class="nav-link active" aria-current="page">
              <svg class="bi pe-none me-2" width="16" height="16" viewBox="0 0 64 64">
                <path d="M32 12L4 36h8v16h16V40h8v12h16V36h8z" fill="currentColor"/>
              </svg>
              Home
          </Link>
        </li>
      </ul>
    </div>
    <div class="d-flex flex flex-column">
      <Route path="/"> 
        <!-- Text components here with commenting in and out -->
        <Home /> 
      </Route>
      <!-- <Route path="/leaderboard/:id"> <Leaderboard /> </Route> -->
    </div>
  </div>
</Router>
