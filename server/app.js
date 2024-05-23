import "dotenv/config";
import express from "express";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/dist")));

import livereload from "livereload";
import connectLivereload from "connect-livereload";

const liveReloadServer = livereload.createServer();
liveReloadServer.watch("../client/dist");
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 500);
});

app.use(connectLivereload());

app.get("/test", (req, res) => {
  res.send({ data: "test123" });
});

import gamesRouter from "./routers/gamesRouter.js";
app.use(gamesRouter);

import leaderboardsRouter from "./routers/leaderboardsRouter.js";
app.use(leaderboardsRouter);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on:", PORT));
