const Student = require("../models/student");
const { Op } = require("sequelize");

class StudentDao {
  async createStudentAsync(data) {
    if (!data.register) {
      throw new Error("Student register is required");
    }
    if (!data.name) {
      throw new Error("Student name is required");
    }
    if (!data.photo) {
      throw new Error("Student photo is required");
    }

    const trackedStudent = await Student.findOne({ where: { register: data.register } });

    if (trackedStudent !== null) {
      throw new Error("Student already exists");
    }

    return await Student.create(data);
  }
  async findAllStudentsAsync(filter) {
    const { name, register } = filter;
    const where = {};

    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }
    if (register) {
      where.register = { [Op.like]: `%${register}%` };
    }

    return await Student.findAll({ where });
  }
  async findStudentAsync(id) {
    return await Student.findByPk(id);
  }
  async updateAsync(userId, data) {
    const trackedStudent = await Student.findByPk(userId);

    if (!trackedStudent) {
      throw new Error("Student not found");
    }

    if (data.name) {
      trackedStudent.name = data.name;
    }
    if (data.photo) {
      trackedStudent.photo = data.photo;
    }

    trackedStudent.save();
    return trackedStudent;
  }
  async deleteAsync(userId) {
    const user = await Student.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return user;
  }
}

module.exports = new StudentDao();
