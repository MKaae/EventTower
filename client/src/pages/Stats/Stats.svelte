<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../../util/api";
  import { Bar } from "svelte-chartjs";
  import { BASE_URL } from "../../stores/generalStore";
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  let chartData = null;

  onMount(async () => {
    const liveHeights = await fetchGet($BASE_URL + "/liveheight");
    if(liveHeights){
        chartData = setupData(liveHeights);
    }
  });

  let overview = null;
  onMount(async () => {
    const data = await fetchGet($BASE_URL + "/overview");
    overview = [
        { name: "falls_raw", title: "Falls Raw", value: data.falls_raw },
        { name: "floors_fallen", title: "Floors Fallen", value: data.floors_fallen },
        { name: "height_fallen", title: "Height Fallen", value: data.height_fallen },
        { name: "jumps", title: "Jumps", value: data.jumps },
        { name: "nb_players_climbing", title: "Number of Climbing Players", value: data.nb_players_climbing },
        { name: "nb_players_live", title: "Number of Live Players", value: data.nb_players_live },
        { name: "players", title: "Players", value: data.players },
        { name: "resets", title: "Resets", value: data.resets },
        { name: "sessions", title: "Sessions", value: data.sessions }
    ];
  });

  let donations = null;
  onMount(async () => {
    donations = await fetchGet($BASE_URL + "/donations");
  });

  function setupData(data) {
    const labels = data.slice(0, 10).map((item) => item.display_name);
    const heights = data.slice(0, 10).map((item) => item.height);

    return {
      labels: labels,
      datasets: [
        {
          label: "Current Height",
          data: heights,
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
          ],
        },
      ],
    };
  }
</script>

<div class="d-flex flex-column m-2 justify-content-center">
    <h5 class="text-center m-2">Live Top Climbers - goal at 1910m</h5>
    <div class="d-flex flex-column m-3 justify-content-center h-100 border border-3 border-grey rounded shadow">
        {#if chartData !== null}
        <Bar
            width={70}
            height={30}
            options={{ maintainAspectRatio: false }}
            data={{ ...chartData, datasets: chartData.datasets }}
        />
        {:else}
            <h5 class="text-center">Loading Data...</h5>
        {/if}
    </div>
    <h5 class="text-center m-4">Current statistics for Deep Dip 2</h5>
    <div>
        {#if overview !== null}
            <div class="d-flex flex-wrap m-3">
                {#each overview as item}
                    <div class="col-md-4 mb-3 text-center border border-3 border-grey rounded shadow">
                        <label for="{item.name}">{item.title}</label>
                        <input type="text" id="{item.name}" class="form-control text-center" bind:value={item.value} readonly>
                    </div>
                {/each}
            </div>
        {:else}
            <h5 class="text-center">Loading Data...</h5>
        {/if}
    </div>
    <h5 class="text-center m-4">Current donations and pricepool</h5>
    <div class="text-center m-2">
        {#if donations !== null}
        <div class="row">
            <div class="col-md-6 mb-3 border border-3 border-grey rounded shadow">
                <label for="gfm_total">Total amount of donations</label>
                <input type="text" id="gfm_total" class="form-control text-center" value={donations.gfm_total} readonly>
            </div>
            <div class="col-md-6 mb-3 border border-3 border-grey rounded shadow">
                <label for="pp_total">Total price pool in $</label>
                <input type="text" id="pp_total" class="form-control text-center" value={donations.pp_total} readonly>
            </div>
        </div>
        {:else}
            <h5 class="text-center">Loading Data...</h5>
        {/if}
    </div>
</div>
