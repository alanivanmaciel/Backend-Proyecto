import usersModel from "../models/user.model.js";

class UserManagerMongo {
    async createUser(newUser) {
        return await usersModel.create(newUser)
    }

    async getUsers() {
        try {
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } =
                await usersModel.paginate({
                    limit: 3,
                    page: 1,
                    lean: true,

                });
                console.log('usermanager', docs);
                
            return {
                status: 'success',
                payload: docs,
                page
            };
        } catch (error) {

            console.error(error);
        }
    }

    async getUserBy(filter) {
        return await usersModel.findOne(filter)
    }

    async getUserById(filter) {
        return await usersModel.findById(filter)
    }
}

export default UserManagerMongo