class UserDto {
    constructor(user) {
        this.fullname = `${user.firstname} ${user.lastname}`,
            this.firstname = user.firstname,
            this.lastname = user.lastname,
            this.email = user.email,
            this.password = user.password
    }
}

export default UserDto