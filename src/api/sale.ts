import express from "express"
import { isUUID } from "./validation"
import { DB }  from "../db"

export function createSaleRoute(db: DB) {
    const router = express.Router();



    router.post("/", async (req, res) => {
        try {        
            const sale = req.body;
            const result = await db.sale.insert(sale);
            res.status(201).json({ status: "created", data: result })
        }
        catch (e) {
            res.status(400).json({status: "invalid input"})
        }
    })


    router.get("/:providerId", async (req, res) => {
        try {        
        
            const providerId = req.params.providerId;
            const result = await db.sale.getSaleByProvider(providerId);
            res.status(201).json({ status: "created", data: result })
        }
        catch (e) {
            res.status(400).json({status: "invalid input"})
        }
    })

    return router;
}