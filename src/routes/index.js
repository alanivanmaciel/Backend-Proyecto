import { Router } from "express";
import cartsRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";
import messageRouter from "./message.router.js";

const router = Router();

router.use("/realtimeproducts", viewsRouter);
router.use("/api/chat", messageRouter);
router.use("/api/carts", cartsRouter);

export default router;
