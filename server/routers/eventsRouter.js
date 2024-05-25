import Router from "express";
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

router.post("/api/events", async (req, res) => {
  const newEvent = req.body;

  try {
    db.events.insertOne(newEvent);
  } catch (error) {
    console.error("Unable to save game", error);
  }
});

export default router;
