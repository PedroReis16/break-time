const router = require('express').Router();
const ctrl = require('../controllers/studentController');
const validate = require('../validators/studentValidator');
const handle = require('../utils/handleValidation');

router.get('/', ctrl.list);
router.post('/', validate.create, handle, ctrl.create);
router.put('/:id', validate.update, handle, ctrl.update);
router.delete('/:id', validate.id, handle, ctrl.remove);

module.exports = router;
