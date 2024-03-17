import { cartService } from "../services/index.js";

class CartController {
    constructor() {
        this.service = cartService
    }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getCart(cid);

            const products = cart.products.map((item) => {
                const productDetails = item.product
                return {
                    _id: productDetails._id.toString(),
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                };
            });

            res.render("carts", {
                status: "succes",
                payload: products,
                style: "index.css",
            });
        } catch (error) {
            res.status(500).send(`Error de servidor get. ${error.message}`);
        }
    }

    createCart = async (req, res) => {
        try {
            return await this.service.createCart();
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }

    addProductToCart = async (req, res) => {
        try {
            return await this.service.addProduct(req.cid, req.pid);
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }

    updateQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cart = await this.service.updateQuantity({ cid, pid, quantity });
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
    }

    deleteProducts = async (req, res) => {
        const { cid } = req.params;
        const cart = await this.service.deleteProducts({ _id: cid });
        res.send({
            status: "succes",
            payload: cart,
        });
    }

    deleteProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.service.deleteProductToCart(cid, pid);
            res.send({
                status: "succes",
                payload: cart,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }
}

export default CartController