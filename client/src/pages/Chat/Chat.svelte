<script>
  import io from "socket.io-client";
  import { onMount } from "svelte";
  import { fetchGet } from "../../../util/api";
  import { useParams } from "svelte-navigator";
  import { user } from "../../stores/generalStore.js";

    const params = useParams();
    const eventId = $params.id;

    const socket = io("localhost:8080");
    socket.on("server-sends-message", (data) => {
        messages = [...messages, { user: data.user, message: data.message }]; 
    });

    let message;
    function submitMessage(){
        socket.emit("client-sends-message", {  message: message, eventId: eventId })
        
    };

    let messages = [];

    $: messages;


    onMount(async () => {
        const messagesFromDb = await fetchGet(`http://localhost:8080/api/chat/${eventId}`);
        if(messagesFromDb){
            messages = messagesFromDb;
        }
    });
</script>

<h6>Chatroom</h6>
{#if $user === null}
    <h1>You are not logged in.</h1>
    <p>Please login to see chat.</p>
{:else}
{#each messages as message}
    <p>{message.user} says: {message.message}</p>
{/each}
<input type="text" bind:value={message}>
<button on:click={submitMessage}>Submit Message</button>
{/if}
