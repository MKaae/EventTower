import db from "../database/connection.js";
import Router from "express";
const router = Router();

import { hashPw, isSame } from "./../util/passwordUtil.js";

import { requireAuth } from "./authMiddleware.js";

router.get("/api/logout", requireAuth, (req, res) => {
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
    
    let checkEmailUnique = null;
    let checkUsernameUnique = null;
    try{
        checkEmailUnique = await db.users.findOne({ email: email });
        checkUsernameUnique = await db.users.findOne({ username: username });
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
        await db.users.insertOne(user)
        sendEmail(email);
        res.send({ data: "Login successful" });
    } else {
        res.send({ data: "Missing fields" })
    }
});

router.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await db.users.findOne({email: email});

    if (!user) {
        return res.send({ data: "User not found" });
    }

    const authConfirmation = await isSame(password, user.password);

    if(email === user.email && authConfirmation){
        req.session.user = {
            email: email,
            role: user.role
        };
        res.send({ data: user.role });
    } else {
        res.send({ data: "Wrong password" });
    }
});

export default router;