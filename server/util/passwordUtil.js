import bcrypt from "bcrypt";

const saltRounds = 14;

export async function hashPw(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error while hashing password:", error);
        return;
    }
}

export async function isSame (password, dbPassword) {
    try {
        const isSamePassword = await bcrypt.compare(password, dbPassword);
        return isSamePassword;
    } catch (error) {
        console.error("Error while comparing passwords:", error);
        return;
    }
}