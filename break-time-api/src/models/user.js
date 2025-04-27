const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

import { v4 as uuidv4 } from "uuid";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    register: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [12],
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
      {
        unique: true,
        fields: ["register"],
      },
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["name"],
      },
      {
        fields: ["lastName"],
      },
    ],
  }
);

module.exports = User;
