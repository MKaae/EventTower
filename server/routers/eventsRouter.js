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

export default router;
