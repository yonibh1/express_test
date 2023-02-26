import express from "express"
import { isUUID } from "./validation"
import { DB }  from "../db"

export function createClientRoute(db: DB) {
    const router = express.Router();

  
    router.post("/", async (req, res) => {
        try {        
            const client=req.body;
            const result = await db.client.insert(client);
            res.status(201).json({ status: "created", data: result })
        }
        catch (e) {
            res.status(400).json({status: "invalid input"})
        }
    })

    return router;
}