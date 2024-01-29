import Router from "express";
import ProductManager from "../daos/FileSystem/productManagerFS.js";

const router = Router();
const productManager = new ProductManager();

router
  .get("/", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
      const products = await productManager.getProducts(limit);
      res.render("home", { products, style: "index.css" });
    } catch (error) {
      console.log(error);
      res.render("Error al obtener la lista de productos!");
      return;
    }
  })

  .get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      console.log("router");
      const productId = await productManager.getProductById(Number(pid));
      res.render({ productId, style: "index.css" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener al intentar obtener el producto.");
      return;
    }
  })

  .post("/", async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.json(newProduct);
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
