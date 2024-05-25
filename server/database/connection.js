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
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Smith", email: "jane.smith@example.com" },
        { name: "Alice Johnson", email: "alice.johnson@example.com" },
        { name: "Steffen Andersen", email: "steffen.andersen@example.com" },
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
      await gamesCollection.deleteMany({});

      const dummyEvents = [
        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
        },

        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
        },

        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
        },

        {
          imageURL: "https://blog.trackmania.com//uploads/2023/03/KEYART_SPRING_2023_LOGOTEXT.jpg",
          name: "Trackmania Spring 2023",
          description:
            "The Spring 2023 campaign will be the 12th seasonal campaign available in Trackmania from April 1st. 25",
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
