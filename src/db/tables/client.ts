import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from "../../model"

type ClientSchemaModel = Model<AppModel.Client.Client>

export interface ClientInterface {
    Schema: ModelStatic<ClientSchemaModel>
    insert: (client: AppModel.Client.Client) => Promise<AppModel.Client.Client>
    delete: (clientId: string) => Promise<boolean>
}

export async function createClientTable(sequelize: Sequelize): Promise<ClientInterface> {
    const ClientSchema = sequelize.define<ClientSchemaModel>("client", {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        fullName: {
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
 
    
    await ClientSchema.sync()

    return {
        Schema: ClientSchema,
        async insert(client) {
            const result = await ClientSchema.create(client)
            return result.toJSON();
        },
        async delete(clientId) {
            const result = await ClientSchema.destroy({
                where: {
                    id: clientId
                }
            })
            return result === 1;
        },
    };
}
