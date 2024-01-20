import { Schema, model } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new Schema({
    product: [{
        "product": Number,
        "quantity": Number
    }]
})

const cartsModel = model(cartsCollection, cartsSchema)

export default cartsModel