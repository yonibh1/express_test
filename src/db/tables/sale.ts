import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from "../../model"

type SaleSchemaModel = Model<AppModel.Sale.Sale>

export interface SaleInterface {
    Schema: ModelStatic<SaleSchemaModel>
    insert: (sale:Omit< AppModel.Sale.Sale,"saleId">) => Promise<AppModel.Sale.Sale>
    delete: (saleId: string) => Promise<boolean>
    getSaleByProvider:(providerId:string)=>Promise<AppModel.Sale.Sale|undefined>
}

export async function createSaleTable(sequelize: Sequelize): Promise<SaleInterface> {
    const SaleSchema = sequelize.define<SaleSchemaModel>("sale", {
        saleId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        clientId: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        productId: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

    }, {
        schema: "store",
        createdAt: false,
    })

    await SaleSchema.sync()

    return {
        Schema: SaleSchema,
        async getSaleByProvider(providerId) {
            const result = await SaleSchema.findByPk(providerId)
            return result?.toJSON()
        },
        async insert(sale) {
            const result = await SaleSchema.create(sale as AppModel.Sale.Sale)
            return result.toJSON();
        },
        async delete(saleId) {
            const result = await SaleSchema.destroy({
                where: {
                    saleId: saleId
                }
            })
            return result === 1;
        },
    };
}
