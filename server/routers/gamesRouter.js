import { Router } from "express";
const router = Router();

import db from "../database/connection.js";

router.get("/api/games", async (req, res) => {
  try {
    const allGames = await db.games.find().toArray();

    res.send({ data: allGames });
  } catch (error) {
    console.error("Unable to get data", error);
    res.send({ data: "Unable to get data." });
  }
});

router.get("/api/game/:game", async (req, res) => {
  try {
    const game = req.params.game;
    const filteredEvents = await db.events.find({ game: game }).toArray();

    res.send({ data: filteredEvents });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching events." });
  }
});

router.post("/api/games", async (req, res) => {
  const newGame = req.body;

  try {
    db.games.insertOne(newGame);
    res.send({ data: "Game created successfully" });
  } catch (error) {
    console.error("Unable to save game", error);
  }
});

router.delete("/api/game/:id", async (req, res) => {
  const gameName = req.params.id;

  try {
    const foundGame = await db.games.findOne({ name: gameName });

    if (!foundGame) {
      return res.status(404).send({ data: "Event not found." });
    }

    await db.games.deleteOne({ name: gameName });
    res.status(200).send({ data: "Game deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: "Internal Server Error." });
  }
});

export default router;
