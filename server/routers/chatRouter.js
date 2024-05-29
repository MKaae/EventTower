import { Router } from "express";
const router = Router();

import { ObjectId } from "mongodb";

import db from "../database/connection.js"

import { requireAuth } from "./authMiddleware.js"

router.get("/api/chat/:id", requireAuth, async (req, res) => {

    const eventId = req.params.id;
    let id;

    try {
        id = ObjectId.createFromHexString(eventId)
    } catch (error) { 
        console.error(error) 
    }

    try {
        const event = await db.events.findOne({ _id: id });

        if (!event) {
            return res.status(404).send({ error: "Event not found." });
        }

        res.send({ data: event.messages });

    } catch (error) { 
        console.error(error) 
    }

});

export default router;