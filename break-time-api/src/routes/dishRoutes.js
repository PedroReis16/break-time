const express = require('express');
const plateController = require('../controllers/plateController');
const router = express.Router();

router.get('/', plateController.getAllPlate);
router.get('/:id', plateController.getPlate);
router.post('/', plateController.create);
router.put('/:id', plateController.update);
router.patch('/:id', plateController.updatePlateStatus);
router.delete('/:id', plateController.deletePlate);

module.exports = router;