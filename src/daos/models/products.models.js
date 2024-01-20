import { Schema, model } from "mongoose";

const productsCollection = "products";

const productsSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  category: String,
  status: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true
}
});

const productsModel = model(productsCollection, productsSchema);

export default productsModel;
