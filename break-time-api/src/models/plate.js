const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Plate = sequelize.define("plate", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: "plates",
    timestamps: true
});

module.exports = Plate;