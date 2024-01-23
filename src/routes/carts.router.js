import Router from "express";
import cartsModel from "../daos/models/carts.models.js";

const router = Router();
const cartsmodel = new cartsModel();

router
  .get("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartsModel.findById(cid)
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
      const result = await cartsModel.create();
      console.log("funca");
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
      const { product, quantity } = req.body;
      const cart = await cartsModel.create({
        product: [{ product, quantity }],
      });
      res.send({
        status: "succes",
        cart,
      });
    } catch (error) {
      res.status(500).send(`Error de servidor. ${error.message}`);
    }
  });

export default router;
