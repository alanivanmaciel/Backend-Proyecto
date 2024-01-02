import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", productsRouter);
app.use("/realtimeproducts", productsRouter);

app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PORT, () => {
  console.log("Escuchando en el puerto 8080:");
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('message', data => {
    console.log(data);
  })
})

//2.31
