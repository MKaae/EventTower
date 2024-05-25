<script>
  import EventCard from "../../components/EventCard.svelte";

  let event = {
    imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
    name: "Trackmania Spring 2023",
    description:
      "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
  };
</script>



<div class="container mt-5">
  <h1>Events</h1>
  <div class="row gx-5 gy-5 mt-3">
    <EventCard {event} />
    <EventCard {event} />

    <EventCard {event} />

    <EventCard {event} />

    
  </div>
</div>
