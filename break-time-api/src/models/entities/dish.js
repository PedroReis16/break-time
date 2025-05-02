const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const plateCategories = require("../enums/plateCategories");

const Dish = sequelize.define("plate", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.ENUM(
            plateCategories.SNACK,
            plateCategories.MEAL,
            plateCategories.DESSERTS,
            plateCategories.DRINKS,
        ),  // Customize esses valores conforme necessário
        allowNull: false,
        defaultValue: plateCategories.MEAL
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

module.exports = Dish;