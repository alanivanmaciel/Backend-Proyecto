import productsModel from "../models/products.models.js";
import mongoose from "mongoose";

class ProductManagerMongo {
  async getProducts() {
    try {
      return await productsModel.find({ isActive: true });
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(pid) {
    try {
      return await productsModel.findById({ _id: pid });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(data) {
    try {
      return await productsModel.findByIdAndUpdate(
        { _id: data.idProduct },
        {
          code: data.code,
          title: data.title,
          description: data.description,
          price: data.price,
          thumbnail: data.thumbnail,
          stock: data.stock,
          category: data.category,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createproduct(newProduct) {
    try {
      return await productsModel.create(newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(pid) {
    try {
      return await productsModel.findByIdAndUpdate(
        { _id: pid },
        { isActive: false }
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManagerMongo;
