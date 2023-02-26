import express from "express"
import { createClientRoute } from "./client"
import { createProductRoute } from "./product"
import {createProviderRoute  } from "./provider"
import {  createSaleRoute} from "./sale"
import { initDB } from "../db"

export async function createServer() {
    const db = await initDB()
    const clientRouter = createClientRoute(db);
    const productRouter = createProductRoute(db);
    const providerRouter = createProviderRoute(db);
    const saleRouter = createSaleRoute(db);



    const app = express();

    app.use(express.json())
    app.use("/client", clientRouter)
    app.use("/product", productRouter)
    app.use("/provider", providerRouter)
    app.use("/sale", saleRouter)


    app.listen(8080, () => {
        console.log("listening")
    })
}