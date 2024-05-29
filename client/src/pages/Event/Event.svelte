<script>
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { fetchGet, fetchPost } from "../../../util/api.js";
  import ArticleCard from "../../components/ArticleCard.svelte";
  import { user, eventId, BASE_URL } from "../../stores/generalStore.js";
  import ArticleCardAdmin from "../../components/ArticleCardAdmin.svelte";

  let event = {};
  let articleList = [];

  $: articleList;

  onMount(async () => {
    const currentEventId = $eventId;
    event = await fetchGet($BASE_URL + `/events/${currentEventId}`);
    articleList = event.articles;
  });

  async function handleNewArticle(title, author, body) {
    const newEvent = {
      title: title,
      author: author,
      body: body,
      articles: [],
      general: {},
      messages: [],
    };

    try {
      const currentEventId = $eventId;
      await fetchPost($BASE_URL + `/events/${currentEventId}/article`, newEvent);

      toast.success("Article succesfully created.", {
        position: "bottom-center",
      });

      event = await fetchGet($BASE_URL + `/events/${currentEventId}`);
      articleList = event.articles;
    } catch (error) {
      console.error(error);
      toast.error("Error creating Article.", {
        position: "bottom-center",
      });
    }
  }
</script>

<div class="container-fluid mt-5 d-flex flex-column justify-content-center align-items-center">
  <div class="row d-flex justify-content-center">
    <div class="col-12 col-lg-6" style="max-width: 500px; max-height: auto;">
      <img
        src={event.imageURL}
        alt="event"
        class="img-fluid rounded border border-3 border-grey rounded shadow-sm"
      />
    </div>
    <div class="col-12 col-lg-6 bg-light border border-3 border-grey rounded shadow">
      <h1 class="text-center">{event.name}</h1>
      <p class="text-center">{event.description}</p>
    </div>
  </div>
  <div class="m-5"><h3>Newsfeed</h3></div>
  <div>
    {#if $user === "admin"}
      <ArticleCardAdmin onNewArticle={handleNewArticle} />
    {/if}
    {#each articleList as article}
      <ArticleCard {article} />
    {/each}
  </div>
</div>
<Toaster />
