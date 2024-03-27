import { productRepository } from "../repositories/index.js";

class ProductController {
  constructor() {
    this.service = productRepository
  }

  getProducts = async (req, res) => {
    try {
      const { limit, pageQuery, query, sort } = req.query;
      const result = await this.service.getProducts(
        limit,
        pageQuery,
        query,
        sort
      );

      let display
      if (req.user.role !== 'admin') {
        display = 'disabled';
        result.payload.forEach(objeto => {
          objeto.displayUser = display;
          objeto.user = req.user.email
        });
      } else {
        result.payload.forEach(objeto => {
          objeto.displayAdmin = 'disabled';
          objeto.user = req.user.email
        });
      }

      res.render("products", {
        status: result.status,
        payload: result.payload,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
        page: result.page,
        display,
        style: "index.css",
      });
    } catch (error) {
      console.log(error);
      res.render("Error al obtener la lista de productos!");
      return;
    }
  }
}

export default ProductController