import Router from "express";
import { ObjectId } from "bson";

const router = Router();

import db from "../database/connection.js";

router.get("/api/events", async (req, res) => {
  try {
    const allEvents = await db.events.find().toArray();

    res.send({ data: allEvents });
  } catch (error) {
    console.error(error);
  }
});

router.get("/api/events/:id", async (req, res) => {
  // Add error handling here
  const eventId = req.params.id;
  let id;
  try {
    id = new ObjectId(eventId);
  } catch (error) {
    console.error(error);
  }

  try {
    const event = await db.events.findOne({ _id: id });

    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    res.send({ data: event });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/api/events", async (req, res) => {
  const newEvent = req.body;

  try {
    db.events.insertOne(newEvent);
  } catch (error) {
    console.error("Unable to save game", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
