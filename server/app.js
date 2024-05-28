import "dotenv/config";
import express from "express";


const app = express();

app.use(express.json());

import session from "express-session";
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
});

app.use(sessionMiddleware);

import http from "http";
const server = http.createServer(app);

import setupSocketServer from "./util/sockets.js";
setupSocketServer(server, sessionMiddleware);

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

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import gamesRouter from "./routers/gamesRouter.js";
app.use(gamesRouter);

import eventsRouter from "./routers/eventsRouter.js";
app.use(eventsRouter);

import leaderboardsRouter from "./routers/leaderboardsRouter.js";
app.use(leaderboardsRouter);

import statsRouter from "./routers/statsRouter.js";
app.use(statsRouter);

import chatRouter from "./routers/chatRouter.js";
app.use(chatRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'))
});

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => console.log("Server is running on:", PORT));
