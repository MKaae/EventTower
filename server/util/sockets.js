import { Server } from "socket.io";
import { ObjectId } from "mongodb";
import escape from "escape-html";
import db from "../database/connection.js";

function setupSocketServer(server, sessionMiddleware){
    const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
    });

    io.engine.use(sessionMiddleware);

    io.on("connection", (socket) => {

        socket.on("client-sends-message", async (data) => {

            data.user = socket.request.session.user.email;
            const message = {
                user: data.user,
                message: escape(data.message)
            }
            
            try {
                const id = ObjectId.createFromHexString(data.eventId)
                const event = await db.events.findOne({_id: id});
                console.log(id);
                if (!event) {
                    console.log("Could not find event");
                    return; 
                }

                event.messages.push(message);
                await db.events.updateOne({_id: id}, {$set: {messages: event.messages}});

            } catch(error) {
                console.error(error)
            }

            io.emit("server-sends-message", message);

        })
    });
}

export default setupSocketServer;