import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from "../../model"

type ProductSchemaModel = Model<AppModel.Product.Product>

export interface ProductInterface {
    Schema: ModelStatic<ProductSchemaModel>
    insert: (product: Omit<AppModel.Product.Product, "barcode">) => Promise<AppModel.Product.Product>,
    // insertFromProvider: (Omit<AppModel.Product.Product, "barcode" | "provider">)Promise<AppModel.Product.Product>,
    delete: (barcode: string) => Promise<boolean>,
    getProductByProvider: (providerId: string) => Promise<AppModel.Product.Product | undefined>
}

export async function createProductTable(sequelize: Sequelize): Promise<ProductInterface> {
    const ProductSchema = sequelize.define<ProductSchemaModel>("sale", {
        barcode: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        productName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        provider: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        priceToClient: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },

    }, {
        schema: "store",
        createdAt: false,
    })

    await ProductSchema.sync()

    return {
        Schema: ProductSchema,
        async getProductByProvider(providerId) {
            const result = await ProductSchema.findByPk(providerId)
            return result?.toJSON()
        },

        // async insertFromProvider(providerId) {
        //     const result = await ProductSchema.
        // },

        async insert(product) {
            const result = await ProductSchema.create(product as AppModel.Product.Product)
            return result.toJSON();
        },
        async delete(barcode) {
            const result = await ProductSchema.destroy({
                where: {
                    barcode: barcode
                }
            })
            return result === 1;
        },
    };
}
