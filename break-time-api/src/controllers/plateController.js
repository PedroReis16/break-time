const dao = require('../dao/plateDao');


module.exports = {

    async getAllPlate(req, res) {
        try {
            const { name, category } = req.query;

            const plates = await dao.findPlatesAsync({ name: name, category: category })

            if (!plates || plates.length === 0) {
                return res.status(204).json([]);
            }

            const responsePlates = plates.map((plate) => ({
                id: plate.id,
                name: plate.name,
                category: plate.category,
                active: plate.active
            }));

            res.json(responsePlates);

        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao listar os pratos. Erro: ${error}` });
        }
    },
    async getPlate(req, res) {
        try {
            const { id } = req.params;
            const plate = await dao.findPlateAsync(id);

            if (!plate) return res.status(404).send();

            const responsePlate = {
                id: plate.id,
                name: plate.name,
                category: plate.category,
                active: plate.active
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


            await dao.createPlateAsync({
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

            await dao.updatePlateAsync(
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
    async updatePlateStatus(req, res) {
        try {
            const { id } = req.params;
            const { active } = req.body;

            const plate = await dao.updatePlateActiveAsync(id, active);

            return res.status(200).json({ message: 'Prato atualizado com sucesso' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro ao atualizar o prato. Erro: ${error}` });
        }
    },
    async deletePlate(req, res) {
        try {
            const { id } = req.params;
            await dao.deletePlateAsync(id);

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