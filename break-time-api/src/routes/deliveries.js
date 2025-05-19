const router = require('express').Router();
const ctrl = require('../controllers/deliveryController');
const validate = require('../validators/deliveryValidator');
const handle = require('../utils/handleValidation');

router.get('/', validate.queryDate, handle, ctrl.list);
router.post('/', validate.create, handle, ctrl.create);

module.exports = router;
