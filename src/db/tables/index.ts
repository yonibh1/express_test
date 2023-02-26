
import { Sequelize } from "sequelize";
import { ClientInterface,createClientTable } from "./client"
import { ProductInterface,createProductTable } from "./product"
import {ProviderInterface,createProviderTable   } from "./provider"
import {SaleInterface,createSaleTable   } from "./sale"



export async function initTables(connection: Sequelize) {
    const client = await createClientTable(connection)
    const product = await createProductTable(connection)
    const provider = await createProviderTable(connection)
    const sale = await createSaleTable(connection)


    return {
        client:client,
        product:product,
        provider:provider,
        sale:sale
    }
}

export type DB =  {
    client: ClientInterface,
    product:ProductInterface,
    provider:ProviderInterface,
    sale:SaleInterface
}