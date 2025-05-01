const User = require("../models/student");

class StudentDao {
  async createUserAsync(data) {
    return await User.create(data);
  }
  async findAllAsync() {
    return await User.findAll();
  }
  async findByIdAsync(id) {
    return await User.findByPk(id);
  }
  async findByRegisterAsync(register) {
    return await User.findOne({ where: { register } });
  }
  async updateAsync(userId, data) {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.update(data);
  }
  async deleteAsync(userId) {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return user;
  }
}

module.exports = new StudentDao();
