import db from "../database/connection.js";
import Router from "express";
const router = Router();

import { hashPw, isSame } from "./../util/passwordUtil.js";

import { requireAuth } from "./authMiddleware.js";

router.post("/api/logout", requireAuth, (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error while logging out:", error);
            res.status(500).send({ data: "Failed to log out" });
        } else {
            res.send({ data: "Logged out" });
        }
    });
});

import { sendEmail } from "../emailService/emailService.js";

router.post("/api/signup", async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    
    const checkEmailUnique = null;
    const checkUsernameUnique = null;
    try{
        checkEmailUnique = await db.dummyUsers.findOne({ email: email });
        checkUsernameUnique = await db.dummyUsers.findOne({ username: username });
    } catch (error ){
        console.log(error);
    }

    if(checkEmailUnique){
        return res.send({ data: "Email already exists"});
    }
    if(checkUsernameUnique){
        return res.send({ data: "Username already exists"});
    }
    
    const password = await hashPw(req.body.password);

    if(email && password){
        const user = {
            username: username,
            email: email,
            password: password,
            role: "user"
        }
        console.log("Does it get here ?")
        await db.dummyUsers.insertOne({ user: user })
        sendEmail(email);
        res.send({ data: "Login successful" });
    } else {
        res.send({ data: "Missing fields" })
    }
});

router.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await db.dummyUser.findOne({email: email});
    
    const authConfirmation = await isSame(password, user.password)
    
    if(email === user.email && authConfirmation){
        req.session.user = {
            email: email
        };
        res.send({ data: "correct" });
    } else {
        res.send({ data: "Wrong password" });
    }
});

export default router;