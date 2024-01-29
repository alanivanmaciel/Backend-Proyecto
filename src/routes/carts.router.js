import Router from "express";
import cartsModel from "../daos/models/carts.models.js";
import CartManagerMongo from "../daos/MongoDB/cartManager.js";

const cartManager = new CartManagerMongo();

const router = Router();

router
  .get("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartManager.getCart({ _id: cid });
      res.send({
        status: "succes",
        payload: cart,
      });
    } catch (error) {
      res.status(500).send(`Error de servidor. ${error.message}`);
    }
  })

  .post("/", async (req, res) => {
    try {
      const result = await cartsModel.create({ products: [] });
      res.send({
        status: "succes",
        payload: result,
      });
    } catch (error) {
      res.status(500).send(`Error de servidor. ${error.message}`);
    }
  })

  .post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartsModel.findById({ _id: cid });
      cart.products.push({ product: pid });
      let result = await cartsModel.findByIdAndUpdate({ _id: cid }, cart);
      res.send({
        status: "succes",
        payload: result,
      });
    } catch (error) {
      res.status(500).send(`Error de servidor. ${error.message}`);
    }
  })

  .put("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const cart = await cartManager.updateQuantity({ cid, pid, quantity });
      res.send({
        status: "succes",
        payload: cart,
      });
    } catch (error) {
      console.error("Error al intentar actualizar el producto:", error);
      res.status(500).json({
        error: "Error interno del servidor al actualizar el producto.",
      });
    }
  })

  .delete("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartManager.deleteProductToCart(cid, pid);
      res.send({
        status: "succes",
        payload: cart,
      });
    } catch (error) {
      res.status(500).send(`Error de servidor. ${error.message}`);
    }
  });

export default router;
