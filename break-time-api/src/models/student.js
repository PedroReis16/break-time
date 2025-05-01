const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
  "students",
  {
    register: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: true,
  }
);

module.exports = Student;
