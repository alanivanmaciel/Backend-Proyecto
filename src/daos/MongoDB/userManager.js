import usersModel from "../models/user.model.js";

class UserManagerMongo {
    async createUser(newUser) {
        return await usersModel.create(newUser)
    }

    async getUsers() {
        return await usersModel.find({})
    }

    async getUserBy(filter) {
        return await usersModel.findOne(filter)
    }
}

export default UserManagerMongo