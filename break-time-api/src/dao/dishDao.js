const Dish = require("../models/entities/dish");
const { Op } = require("sequelize");

class DishDao {
    async createDishAsync(data) {
        var trackedPlate = await Dish.findOne({ where: { name: data.name } });

        if (trackedPlate) {
            throw Error(`O prato ${data.name} já existe`);
        }

        if (!data.name) {
            throw new Error("Nome do prato é obrigatório.");
        }
        if (!data.category) {
            throw new Error("Categoria do prato é obrigatória.");
        }

        return await Dish.create(data);
    }
    async findDishesAsync(filter) {
        const whereConditions = {};

        if (filter) {
            Object.keys(filter).forEach(key => {
                if (filter[key]) {
                    whereConditions[key] = { [Op.ne]: null };
                }
            });
        }

        return await Dish.findAll({ where: whereConditions });
    }
    async findDishAsync(id) {
        const plate = await Dish.findByPk(id);
        if (!plate) {
            throw new Error("Plate not found");
        }
        return plate;
    }

    async updateDishAsync(id, data) {
        const plate = await Dish.findPlateAsync(id);

        if (!plate) {
            throw new Error("Plate not found");
        }

        if (data.name) {
            plate.name = data.name;
        }
        if (data.category) {
            plate.category = data.category;
        }

        await plate.save();
        return plate;
    }
    async updateDishStatusAsync(id, active) {
        const plate = await this.findDishAsync(id);

        if (!plate) {
            throw new Error("Plate not found");
        }

        plate.active = active;
        await plate.save();
        return plate;
    }

    async deleteDishAsync(userId) {
        const plate = await Dish.findByPk(userId);
        if (!plate) {
            throw new Error("Plate not found");
        }
        await plate.destroy();
        return plate;
    }
}

module.exports = new DishDao();
