import Router from "express";
import { ObjectId } from "bson";

const router = Router();

import db from "../database/connection.js";

router.get("/api/events/game/:game", async (req, res) => {
  try {
    const game = req.params.game;
    const filteredEvents = await db.events.find({ game: game }).toArray();

    res.send({ data: filteredEvents });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching events.' });
  }
});

router.get("/api/events/:id", async (req, res) => {
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
      return res.status(404).send({ error: "Event not found." });
    }

    res.send({ data: event });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

router.post("/api/events", async (req, res) => {
  const newEvent = req.body;
  newEvent.articles = [];
  newEvent.general = {};
  newEvent.messages = [];

  try {
    db.events.insertOne(newEvent);
    res.send({ data: "Event created successfully" });
  } catch (error) {
    console.error("Unable to save event", error);
    res.status(500).send({ error: "Internal Server Error." });
  }
});

router.post("/api/events/:id/article", async (req, res) => {
  const eventId = req.params.id;
  const newArticle = req.body;

  try {
    const id = ObjectId.createFromHexString(eventId);
    const event = await db.events.findOne({ _id: id });

    if (!event) {
      return res.status(404).send({ data: "Event not found." });
    }
    event.articles.push(newArticle);
    await db.events.updateOne({ _id: id }, { $set: { articles: event.articles } });
    res.status(200).send({ data: "Event updated succesfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: "Internal Server Error." });
  }
});

export default router;
