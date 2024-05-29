<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";
  import { fetchGet } from "../../../util/api";
  import { user, eventId, BASE_URL } from "../../stores/generalStore.js";

  const socket = io("localhost:8080");
  socket.on("server-sends-message", (data) => {
    messages = [...messages, { user: data.user, message: data.message }];
  });

  let message;
  function submitMessage() {
    socket.emit("client-sends-message", { message: message, eventId: eventId });
    message = "";
  }

  let messages = [];

  $: messages;

  onMount(async () => {
    const currentEventId = $eventId;
    const messagesFromDb = await fetchGet($BASE_URL + `/chat/${currentEventId}`);
    if (messagesFromDb) {
      messages = messagesFromDb;
    }
  });
</script>

<div
  class="d-flex flex-column justify-content-center align-items-center m-2 p-4 border border-3 border-grey rounded shadow"
>
  <h6>Chatroom</h6>
  {#if $user === null}
    <h1>You are not logged in.</h1>
    <p>Please login to see chat.</p>
  {:else}
    {#each messages as message}
      <p>{message.user} says: {message.message}</p>
    {/each}
    <div class="d-flex flex-column">
      <textarea class="textbox mb-2" bind:value={message}></textarea>
      <button class="btn btn-primary" on:click={submitMessage}>Submit Message</button>
    </div>
  {/if}
</div>

<style>
  .textbox {
    width: 200px;
  }
</style>
