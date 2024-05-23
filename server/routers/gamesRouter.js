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

router.post("/api/games", async (req, res) => {
  const newGame = req.body;

  try {
    db.games.insertOne(newGame);
  } catch (error) {
    console.error("Unable to save game", error);
  }
});

export default router;
