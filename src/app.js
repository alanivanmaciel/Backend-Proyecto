import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./managers/productManagerFS.js";

const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/realtimeproducts", viewsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PORT, () => {
  console.log("Escuchando en el puerto 8080:");
});

const io = new Server(httpServer);
const productManager = new ProductManager();

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado.");

  socket.on("addProduct", async (data) => {
    const newProduct = {
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      code: data.code,
      stock: data.stock,
      category: data.category
    };
    console.log(newProduct);
    console.log('hasta aca llega data - app.js');
    await productManager.addProduct(newProduct);
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", { products: updatedProducts });


  });

  socket.on("deleteProduct", async (data) => {
    const idProduct = data.idProduct;
    await productManager.deleteProduct(parseInt(idProduct));
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", { products: updatedProducts });
  });
});
