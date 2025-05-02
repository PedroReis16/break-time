const Plate = require("../models/entities/plate");
const { Op } = require("sequelize");

class PlateDao {
    async createPlateAsync(data) {
        var trackedPlate = await Plate.findOne({ where: { name: data.name } });

        if (trackedPlate) {
            throw Error(`O prato ${data.name} já existe`);
        }

        if (!data.name) {
            throw new Error("Nome do prato é obrigatório.");
        }
        if (!data.category) {
            throw new Error("Categoria do prato é obrigatória.");
        }

        return await Plate.create(data);
    }
    async findPlatesAsync(filter) {
        const whereConditions = {};

        if (filter) {
            Object.keys(filter).forEach(key => {
                if (filter[key]) {
                    whereConditions[key] = { [Op.ne]: null };
                }
            });
        }

        return await Plate.findAll({ where: whereConditions });
    }
    async findPlateAsync(id) {
        const plate = await Plate.findByPk(id);
        if (!plate) {
            throw new Error("Plate not found");
        }
        return plate;
    }

    async updatePlateAsync(id, data) {
        const plate = await Plate.findPlateAsync(id);

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
    async updatePlateActiveAsync(id, active) {
        const plate = await this.findPlateAsync(id);

        if (!plate) {
            throw new Error("Plate not found");
        }

        plate.active = active;
        await plate.save();
        return plate;
    }

    async deletePlateAsync(userId) {
        const plate = await Plate.findByPk(userId);
        if (!plate) {
            throw new Error("Plate not found");
        }
        await plate.destroy();
        return plate;
    }
}

module.exports = new PlateDao();
