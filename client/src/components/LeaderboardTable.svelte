<script>
  export let players;
</script>

<div id="tableData">Hello</div>

<table class="table">
  <thead>
    <tr>
      <th scope="col">rank</th>
      <th scope="col">name</th>
      <th scope="col">height</th>
      <th scope="col">update count</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    {#each players as player}
      <tr>
        <td>{player.rank}</td>
        <td>{player.name}</td>
        <td>{player.height}</td>
        <td>{player.update_count}</td>
      </tr>
    {/each}
  </tbody>
</table>

