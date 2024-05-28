import Router from "express";
const router = Router();

router.get("/api/liveheight", async (req, res) => {
    await fetch("https://dips-plus-plus.xk.io/live_heights/global")
        .then((response) => response.json())
        .then((result) => res.send({ data: result }))
        .catch((error) => {
            console.error(error);
            res.status(500).send({ data: "Something went wrong." });
        });
});

router.get("/api/overview", async (req, res) => {
    await fetch("https://dips-plus-plus.xk.io/overview")
        .then((response) => response.json())
        .then((result) => res.send({ data: result }))
        .catch((error) => {
            console.error(error);
            res.status(500).send({ data: "Something went wrong." });
        });
});

router.get("/api/donations", async (req, res) => {
    await fetch("https://dips-plus-plus.xk.io/donations")
        .then((response) => response.json())
        .then((result) => res.send({ data: result }))
        .catch((error) => {
            console.error(error);
            res.status(500).send({ data: "Something went wrong." });
        });
});

export default router;