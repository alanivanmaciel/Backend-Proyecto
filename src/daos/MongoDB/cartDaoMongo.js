import cartsModel from "./models/carts.models.js";

class CartDaoMongo {
  constructor() {
    this.service = cartsModel
  }

  async get(cid) {
    return await this.service.findOne({ _id: cid });
  }

  async create() {
    return await this.service.create({ products: [] });
  }

  addProductToCart = async (cid, pid) => {
    const cart = await this.service.findById({ _id: cid });
    cart.products.push({ product: pid });
    let result = await this.service.findByIdAndUpdate({ _id: cid }, cart);
    return result;
  }

  async deleteProductToCart(cid, pid) {
    const cart = await this.service.findOne({ _id: cid });
    if (cart) {
      const index = cart.products.findIndex(
        (product) => product._id.toString() === pid
      );
      if (index !== -1) {
        cart.products.splice(index, 1);
        await cart.save();
        return cart;
      } else {
        return "Producto no encontrado en el carrito";
      }
    } else {
      return "Carrito no encontrado.";
    }
  }

  async deleteProducts(cid) {
    const cart = await this.service.findOne({ _id: cid });
    if (cart) {
      cart.products = [];
      await cart.save();
      return "Todos los productos del carrito fueron eliminados.";
    } else {
      return "Carrito no encontrado.";
    }
  }

  async updateQuantity({ cid, pid, quantity }) {
    const cart = await this.service.findOne({ _id: cid });
    if (cart) {
      const index = cart.products.findIndex(
        (product) => product._id.toString() === pid
      );
      if (index !== -1) {
        cart.products[index].quantity = quantity;
        await cart.save();
        console.log("Cantidad del producto actualizada con éxito");
        return cart;
      } else {
        return "Producto no encontrado en el carrito";
      }
    } else {
      return "Carrito no encontrado.";
    }
  }
}

export default CartDaoMongo;
