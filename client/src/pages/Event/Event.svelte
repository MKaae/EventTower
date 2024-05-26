<script>
  import { onMount, setContext } from "svelte";
  import { useParams } from "svelte-navigator";
  import { fetchGet, fetchPost } from "../../../util/api.js";
  import { eventPage } from "../../stores/generalStore.js";
  import { eventStore } from "../../stores/generalStore.js";
  import { locationStore } from "../../stores/locationStore.js";
  import ArticleCard from "../../components/ArticleCard.svelte";
  import ArticleCardAdmin from "../../components/ArticleCardAdmin.svelte";

  const params = useParams();
  const eventId = $params.id;
  let event = {};
  let articleList = [];

  let user = { role: "admin" };

  onMount(async () => {
    locationStore.update();
    event = await fetchGet(`http://localhost:8080/api/events/${eventId}`);
    eventPage.set(true);
    eventStore.set({ id: event._id });
    articleList = event.articles;
  });

  async function handleNewArticle(title, author, body) {
    const newEvent = {
      title: title,
      author: author,
      body: body,
    };

    try {
      const response = await fetchPost(`http://localhost:8080/api/events/${eventId}/article`, newEvent);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="container-fluid mt-5 d-flex flex-column justify-content-center align-items-center">
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-lg-6">
      <h1 class="text-center">{event.name}</h1>
      <p class="text-center">{event.description}</p>
    </div>

    <div class="col-12 col-lg-6" style="max-width: 500px; max-height: auto;">
      <img src={event.imageURL} alt="event" class="img-fluid rounded" />
    </div>
  </div>
  <div class="m-5"><h2>News</h2></div>
  <div>
    {#if user.role === "admin"}
      <ArticleCardAdmin onNewArticle={handleNewArticle} />
    {/if}
    {#each articleList as article}
      <ArticleCard {article} />
    {/each}
  </div>
</div>
