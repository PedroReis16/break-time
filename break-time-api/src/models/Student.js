const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Student', {
    ra: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
