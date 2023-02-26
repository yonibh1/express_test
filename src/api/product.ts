import express from "express"
import { DB }  from "../db"

export function createProductRoute(db: DB) {
    const router = express.Router();

   

    router.post("/:providerId", async (req, res) => {
        try {        
            
            const product=req.body
            const result = await db.product.insert(product);
            res.status(201).json({ status: "created", data: result })
        }
        catch (e) {
            res.status(400).json({status: "invalid input"})
        }
    })



    router.get("/:providerId", async (req, res) => {
        try {        
        
            const providerId = req.params.providerId;
            const result = await db.product.getProductByProvider(providerId);
            res.status(201).json({ status: "created", data: result })
        }
        catch (e) {
            res.status(400).json({status: "invalid input"})
        }
    })

    return router;
}