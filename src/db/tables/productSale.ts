import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from "../../model"

type ProductSale = AppModel.ProductSale.ProductSale
type ProductSaleSchemaModel = Model<ProductSale>

export interface ProductSaleInterface {
    Schema: ModelStatic<ProductSaleSchemaModel>
    
    getProductFromProvider: (providerId: string) => Promise<ProductSale | undefined>
}

export async function createProductSaleTable(sequelize: Sequelize): Promise<ProductSaleInterface> {
    const ProductSaleSchema = sequelize.define<ProductSaleSchemaModel>("productSale", {
        barcode: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        saleId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },

    }, {
        schema: "store",
        createdAt: false,
    })
    // AppModel.Product.Product .belongsToMany: any(AppModel.Sale.Sale, { through: ProductSaleSchema });
    // ProductSale.belongsToMany(AppModel.Product.Product, { through: ProductSaleSchema });

    await ProductSaleSchema.sync()

    return {
        Schema: ProductSaleSchema,
        async getProductFromProvider(providerId) {
            const result = await ProductSaleSchema.findByPk(providerId)
            return result?.toJSON()
        }
    };
}
