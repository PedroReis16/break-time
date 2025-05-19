const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    "Delivery",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["date", "StudentId"],
        },
      ],
    }
  );
