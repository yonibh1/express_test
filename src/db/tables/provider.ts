import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from "../../model"

type ProviderSchemaModel = Model<AppModel.Provider.provider>

export interface ProviderInterface {
    Schema: ModelStatic<ProviderSchemaModel>
    insert: (provider:Omit< AppModel.Provider.provider,"providerId">) => Promise<AppModel.Provider.provider>
    delete: (providerId: string) => Promise<boolean>
}

export async function createProviderTable(sequelize: Sequelize): Promise<ProviderInterface> {
    const ProviderSchema = sequelize.define<ProviderSchemaModel>("provider", {
        providerId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        providerName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        adress: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
    }, {
        schema: "store",
        createdAt: false,
    })
    
    await ProviderSchema.sync()

    return {
        Schema: ProviderSchema,
        async insert(provider) {
            const result = await ProviderSchema.create(provider as AppModel.Provider.provider)
            return result.toJSON();
        },
        async delete(providerId) {
            const result = await ProviderSchema.destroy({
                cascade:false,
                where: {
                    providerId:providerId
                
                }
            })
            return result === 1;
        },
    };
}
