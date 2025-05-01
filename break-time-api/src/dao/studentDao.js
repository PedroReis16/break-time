const Student = require("../models/student");

class StudentDao {
  async createStudentAsync(data) {
    return await Student.create(data);
  }
  async findAllAsync() {
    return await Student.findAll();
  }
  async findByIdAsync(id) {
    return await Student.findByPk(id);
  }
  async findByRegisterAsync(register) {
    return await Student.findOne({ where: { register } });
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
