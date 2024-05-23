import Router from "express";
const router = Router();

router.get("/api/leaderboard", async (req, res) => {
  console.log("hit on /api/leaderboard");

  const leaderboardList = await fetch("https://dips-plus-plus.xk.io/leaderboard/global")
    .then((response) => response.json())
    .then((result) => res.send({data: result}))
    .catch((error) => console.error(error));
});

export default router;
