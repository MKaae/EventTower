<script>
  import LeaderboardTable from "../../components/LeaderboardTable.svelte";

  import { onMount } from "svelte";
  import { fetchGet } from "../../../util/api";

  let leaderboardList = [];

  onMount(async () => {
    leaderboardList = await fetchGet("http://localhost:8080/api/leaderboard");
  });
</script>

<div class="container mt-5">
  <h1>Race to the Top: Check Out the Latest Leaderboard Standings in Deep Dip 2!</h1>
  <p>
    Stay ahead of the competition with our dynamic leaderboard for Trackmania! Whether you're a seasoned pro
    or a newcomer to the track, our leaderboard offers real-time updates on the top racers, their scores, and
    their progress. Keep track of your friends' performances, challenge yourself to climb the ranks, and
    celebrate your victories as you compete for the ultimate glory in the world of Trackmania. Check back
    regularly for updates and see who's dominating the tracks today!
  </p>

  <LeaderboardTable players={leaderboardList} />
</div>
