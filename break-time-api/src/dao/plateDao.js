const Plate = require("../models/plate");
const { Op } = require("sequelize");

class PlateDao {
    async createPlateAsync(data) {
        if (!data.name) {
            return res.status(400).json({ message: 'Nome do prato é obrigatório.' });
        }
        if (!data.category) {
            return res.status(400).json({ message: 'Categoria do prato é obrigatória.' });
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
        const plate = await this.findPlateAsync(id);

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

    async deleteAsync(userId) {
        const plate = await this.findPlateAsync(userId);
        if (!plate) {
            throw new Error("Plate not found");
        }
        await plate.destroy();
        return plate;
    }
}

module.exports = new PlateDao();
