const express = require('express');
const dishController = require('../controllers/dishController');
const router = express.Router();

router.get('/', dishController.getAllDishes);
router.get('/:id', dishController.getDish);
router.post('/', dishController.create);
router.put('/:id', dishController.update);
router.patch('/:id', dishController.updateDishStatus);
router.delete('/:id', dishController.deleteDish);

module.exports = router;