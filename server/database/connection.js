import { MongoClient } from "mongodb";

const isDeleteMode = process.argv.includes('delete');

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const dbName = "event_tower";

await client.connect();

const db = client.db(dbName);


if(isDeleteMode){
  async function resetDatabase() {
    try {      
      const usersCollection = db.collection("users");
  
      await usersCollection.deleteMany({});
  
      const dummyUsers = [
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Smith", email: "jane.smith@example.com" },
        { name: "Alice Johnson", email: "alice.johnson@example.com" },
      ];
  
      const result = await usersCollection.insertMany(dummyUsers);
      
      console.log(`${result.insertedCount} new dummy users inserted`);
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
};
