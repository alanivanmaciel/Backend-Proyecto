import userDao from "../daos/factory.js"
import UserService from "./users.services.js";

const { UserDao } = userDao
const userService = new UserService(new UserDao())

export default userService