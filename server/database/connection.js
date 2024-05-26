import { MongoClient } from "mongodb";

const isDeleteMode = process.argv.includes("delete");

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const dbName = "event_tower";

await client.connect();

const db = client.db(dbName);

if (isDeleteMode) {
  async function resetDatabase() {
    try {
      /* Add users to development database */
      const usersCollection = db.collection("users");
      await usersCollection.deleteMany({});

      const dummyUsers = [
        { username: "JohnDoe", email: "john.doe@example.com" },
        { username: "JaneSmith", email: "jane.smith@example.com" },
        { username: "AliceJohnson", email: "alice.johnson@example.com" },
        { username: "SteffenAndersen", email: "steffen.andersen@example.com" },
      ];

      const result = await usersCollection.insertMany(dummyUsers);
      console.log(`${result.insertedCount} new dummy users inserted`);

      /* Add games to development database */
      const gamesCollection = db.collection("games");
      await gamesCollection.deleteMany({});

      const dummyGames = [
        {
          imageURL: "https://cdn.cloudflare.steamstatic.com/steam/apps/2225070/capsule_616x353.jpg",
          name: "Trackmania",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          link: "/",
        },
        {
          imageURL: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg",
          name: "CS2",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          link: "/",
        },
        {
          imageURL: "https://cdn.cloudflare.steamstatic.com/steam/apps/238960/header.jpg",
          name: "Path of Exile",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          link: "/",
        },
      ];
      const gamesResult = await gamesCollection.insertMany(dummyGames);
      console.log(`${gamesResult.insertedCount} new dummy games inserted`);

      /* Add events to development database */
      const eventsCollection = db.collection("events");
      await eventsCollection.deleteMany({});

      const dummyEvents = [
        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          game: "trackmania",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
          articles: [
            {
              title: "Trackmania World Cup Announced for August",
              author: "Steffen",
              body: "The annual Trackmania World Cup has been officially announced for August this year. Top players from around the globe will compete in a series of intense races, showcasing their skills and strategies. The event promises to bring thrilling moments and exciting competitions for all Trackmania fans.",
            },
            {
              title: "New Trackmania Update Introduces Customizable Skins",
              author: "Steffen",
              body: "Trackmania developers have rolled out a new update that allows players to create and customize their own car skins. This highly anticipated feature lets players express their creativity and stand out on the tracks. The update also includes several bug fixes and performance improvements.",
            },
            {
              title: "Trackmania Community Hosts Charity Race Event",
              author: "Steffen",
              body: "The Trackmania community is coming together for a charity race event to raise funds for local children's hospitals. The event will feature popular Trackmania streamers and content creators, who will race live while encouraging viewers to donate. All proceeds from the event will go towards supporting medical care for children in need.",
            },
          ],
        },

        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          game: "trackmania",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
          articles: [
            {
              title: "Trackmania World Cup Announced for August",
              author: "Steffen",

              body: "The annual Trackmania World Cup has been officially announced for August this year. Top players from around the globe will compete in a series of intense races, showcasing their skills and strategies. The event promises to bring thrilling moments and exciting competitions for all Trackmania fans.",
            },
            {
              title: "New Trackmania Update Introduces Customizable Skins",
              author: "Steffen",

              body: "Trackmania developers have rolled out a new update that allows players to create and customize their own car skins. This highly anticipated feature lets players express their creativity and stand out on the tracks. The update also includes several bug fixes and performance improvements.",
            },
            {
              title: "Trackmania Community Hosts Charity Race Event",
              author: "Steffen",

              body: "The Trackmania community is coming together for a charity race event to raise funds for local children's hospitals. The event will feature popular Trackmania streamers and content creators, who will race live while encouraging viewers to donate. All proceeds from the event will go towards supporting medical care for children in need.",
            },
          ],
        },

        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          game: "trackmania",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
          articles: [
            {
              title: "Trackmania World Cup Announced for August",
              author: "Steffen",

              body: "The annual Trackmania World Cup has been officially announced for August this year. Top players from around the globe will compete in a series of intense races, showcasing their skills and strategies. The event promises to bring thrilling moments and exciting competitions for all Trackmania fans.",
            },
            {
              title: "New Trackmania Update Introduces Customizable Skins",
              author: "Steffen",

              body: "Trackmania developers have rolled out a new update that allows players to create and customize their own car skins. This highly anticipated feature lets players express their creativity and stand out on the tracks. The update also includes several bug fixes and performance improvements.",
            },
            {
              title: "Trackmania Community Hosts Charity Race Event",
              author: "Steffen",

              body: "The Trackmania community is coming together for a charity race event to raise funds for local children's hospitals. The event will feature popular Trackmania streamers and content creators, who will race live while encouraging viewers to donate. All proceeds from the event will go towards supporting medical care for children in need.",
            },
          ],
        },

        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          game: "trackmania",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
          articles: [
            {
              title: "Trackmania World Cup Announced for August",
              author: "Steffen",
              body: "The annual Trackmania World Cup has been officially announced for August this year. Top players from around the globe will compete in a series of intense races, showcasing their skills and strategies. The event promises to bring thrilling moments and exciting competitions for all Trackmania fans.",
            },
            {
              title: "New Trackmania Update Introduces Customizable Skins",
              author: "Steffen",

              body: "Trackmania developers have rolled out a new update that allows players to create and customize their own car skins. This highly anticipated feature lets players express their creativity and stand out on the tracks. The update also includes several bug fixes and performance improvements.",
            },
            {
              title: "Trackmania Community Hosts Charity Race Event",
              author: "Steffen",

              body: "The Trackmania community is coming together for a charity race event to raise funds for local children's hospitals. The event will feature popular Trackmania streamers and content creators, who will race live while encouraging viewers to donate. All proceeds from the event will go towards supporting medical care for children in need.",
            },
          ],
        },
      ];

      const eventsResult = await eventsCollection.insertMany(dummyEvents);
      console.log(`${eventsResult.insertedCount} new dummy events inserted`);
    } catch (error) {
      console.error("An error occurred while resetting database:", error);
    } finally {
      await client.close();
    }
  }

  resetDatabase().catch(console.error);
}

export default {
  users: db.collection("users"),
  games: db.collection("games"),
  events: db.collection("events"),
};
