const User = require("../model/user.model");

class UserService {
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password })
    return res.dataValues
  }
}

module.exports = new UserService();
