import UserService from "./users.services.js";
import ProductService from "./products.services.js";
import CartService from "./carts.services.js";

import factory from "../daos/factory.js";
const { UserDao, ProductDao, CartsDao } = factory

export const userService = new UserService(new UserDao())
export const productService = new ProductService(new ProductDao())
export const cartService = new CartService(new CartsDao())