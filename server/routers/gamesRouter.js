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

export default router;
