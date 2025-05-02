const dao = require('../dao/dishDao');


module.exports = {

    async getAllDishes(req, res) {
        try {
            const { name, category } = req.query;

            const dishes = await dao.findDishesAsync({ name: name, category: category })

            if (!dishes || dishes.length === 0) {
                return res.status(204).json([]);
            }

            const responseDishes = dishes.map((plate) => ({
                id: plate.id,
                name: plate.name,
                category: plate.category,
                active: plate.active
            }));

            res.json(responseDishes);

        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao listar os pratos. Erro: ${error}` });
        }
    },
    async getDish(req, res) {
        try {
            const { id } = req.params;
            const dish = await dao.findDishAsync(id);

            if (!dish) return res.status(404).send();

            const responsePlate = {
                id: dish.id,
                name: dish.name,
                category: dish.category,
                active: dish.active
            };

            res.json(responsePlate);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao buscar o prato. Erro: ${error}` });
        }
    }, async create(req, res) {
        try {
            const { name, category } = req.body;


            await dao.createDishAsync({
                name: name,
                category: category
            });

            return res.status(201).json({ message: 'Prato criado com sucesso' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao criar o prato. ${error}` });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, category } = req.body;

            await dao.updateDishAsync(
                id,
                {
                    name: name,
                    category: category
                });

            return res.status(200).json({ message: 'Prato atualizado com sucesso' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao atualizar o prato. Erro: ${error}` });
        }
    },
    async updateDishStatus(req, res) {
        try {
            const { id } = req.params;
            const { active } = req.body;

            const plate = await dao.updateDishStatusAsync(id, active);

            return res.status(200).json({ message: 'Prato atualizado com sucesso' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao atualizar o prato. Erro: ${error}` });
        }
    },
    async deleteDish(req, res) {
        try {
            const { id } = req.params;
            await dao.deleteDishAsync(id);

            return res.status(204).send();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao deletar o prato. Erro: ${error}` });
        }
    }
}



exports.update = async (req, res) => {
    try {
        const result = await dao.update(req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o prato.' });
    }
};

exports.delete = async (req, res) => {
    try {
        await dao.delete(req.params.id);

        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o prato.' });
    }
};