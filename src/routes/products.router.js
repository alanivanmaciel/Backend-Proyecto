import { Router } from "express";
import ProductController from "../controllers/products.controller.js";

const router = Router();
const { getProducts } = new ProductController()

router.get("/", getProducts);

export default router;
