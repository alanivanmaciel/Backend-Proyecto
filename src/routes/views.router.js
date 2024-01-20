import { Router } from "express";
import ProductManager from "../daos/FileSystem/productManagerFS.js";
import ProductManagerMongo from "../daos/MongoDB/productManager.js";

const router = Router();
const productManager = new ProductManager();
const managerMongo = new ProductManagerMongo();

router
  .get("/", async (req, res) => {
    try {
      const products = await managerMongo.getProducts();
      const product = products.map((product) => ({
        ...product.toObject(),
      }));
      res.render("realtimeproducts", { product, style: "index.css" });
    } catch (error) {
      console.log(error);
      res.render("Error al obtener la lista de productos!");
      return;
    }
  })

  .get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      console.log(pid, "aca");
      //const productId = await productManager.getProductById(Number(pid));
      const product = await managerMongo.getProductById(pid);
      // const product = products.map((product) => ({
      //   ...product.toObject(),
      // }));
      //console.log(product);
      res.send("realtimeproducts", { product, style: "index.css" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener al intentar obtener el producto.");
      return;
    }
  })

  .post("/", async (req, res) => {
    const { product } = req.body;
    const result = await managerMongo.create(product);
    res.json(result);
  })

  .put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const { prop, value } = req.body;

      await productManager.updateProduct(parseInt(pid), prop, value);

      res.status(201).send({
        status: "succes",
        message: "Producto actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al intentar actualizar el producto:", error);
      res.status(500).json({
        error: "Error interno del servidor al actualizar el producto.",
      });
    }
  })

  .delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      await productManager.deleteProduct(parseInt(pid));
      res.status(201).send({
        status: "succes",
        message: "Producto eliminado correctamente.",
      });
    } catch (error) {}
  });

export default router;
