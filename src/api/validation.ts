import { Client, Sale } from "../model";
import { Provider } from "../model";
import { Product } from "../model";
import validate from 'uuid-validate'

export function isUUID(uuid: string): boolean {
    return validate(uuid, 4);
}




// export function validateClient(input: Client.Client): Client.Client {
//     return {

//         id: input.id,
//         fullName: input.fullName,
//         adress: input.adress,
//         phoneNumber: input.phoneNumber,
//     }
// }

// export function validateProvider(input: Provider.provider): Provider.provider {
//     // validate input
//     return {

//         providerId: input.providerId,
//         providerName: input.providerName,
//         adress: input.adress,
//         phoneNumber: input.phoneNumber,
//     }
// }

// export function validateProduct(input: Product.Product): Product.Product {
//     // validate input
//     return {

//         barcode: input.barcode,
//         productName: input.productName,
//         provider: input.provider,
//         priceToClient: input.priceToClient,
//     }
// }

// export function validateSale(input: Sale.Sale): Sale.Sale {
//     // validate input
//     return {

//         saleId: input.saleId,
//         clientId: input.clientId,
//         productId: input.productId,
//         price: input.price,
//     }
// }