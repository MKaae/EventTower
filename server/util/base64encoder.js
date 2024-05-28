import fs from "fs";

export function base64str(file){
    const bitmap = fs.readFileSync(file)
    return new Buffer.from(bitmap).toString('base64')
};