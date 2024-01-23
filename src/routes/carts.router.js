import Router from "express";
import CartsManager from "../daos/FileSystem/cartsManagerFS.js";
import cartsModel from "../daos/models/carts.models.js";

const router = Router();
const cartsmodel = new cartsModel();

const cartsService = new CartsManager();


router
.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(parseInt(cid));
    res.send({
      status: "succes",
      payload: cart,
    });
  } catch (error) {
    console.log(error);
  }
})
.post("/", async (req, res) => {
  try {
    const result = await cart.createCart();
    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    res.status(500).send(`Error de servidor. ${error.message}`);
  }
})

.post("/:cid/product/:pid", async (req, res) => {
  //const { cid, pid } = req.params;
  const { product, quantity } = req.params;
  console.log(typeof cartsModel);
  
  await cartsmodel.create({
    product: [{product, quantity}]
  });
    res.send({
      status: "succes",
      cart,
    });
  });

export default router;
