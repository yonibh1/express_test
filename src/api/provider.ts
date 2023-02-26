import express from "express"
import { isUUID } from "./validation"
import { DB }  from "../db"

export function createProviderRoute(db: DB) {
    const router = express.Router();

    router.delete("/:providerId", async (req, res) => {
        try {
            const okId = isUUID(req.params.providerId)
            if(okId){
            const providerId=req.params.providerId;
            const success = await db.provider.delete(providerId);
            if(success) {
                res.status(200).json({ status: "deleted" })
            } else {
                res.status(404).json({ status: "not found" })
            }
        }else{
            console.log("The entered id does not match an authorized id");
            
        }
        } catch (e) {
            res.status(400).json({ status: "invalid input" })
        }
    })


    router.post("/", async (req, res) => {
        try {        
            const provider = req.body;
            const result = await db.provider.insert(provider);
            res.status(201).json({ status: "created", data: result })
        }
        catch (e) {
            res.status(400).json({status: "invalid input"})
        }
    })

    return router;
}