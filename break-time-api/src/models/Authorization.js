const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    "Authorization",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 3 },
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
