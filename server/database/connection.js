import { MongoClient } from "mongodb";

const URL = process.env.DB_URL;
const client = new MongoClient(URL);

const dbName = "event_tower";

await client.connect();

const db = client.db(dbName);

export default {
  users: db.collection("users"),
  games: db.collection("games"),
  events: db.collection("events"),
};
