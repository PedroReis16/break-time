const router = require('express').Router();
const ctrl = require('../controllers/authorizationController');
const validate = require('../validators/authorizationValidator');
const handle = require('../utils/handleValidation');

router.get('/', validate.queryDate, handle, ctrl.list);
router.post('/', validate.create, handle, ctrl.create);
router.put('/:id', validate.update, handle, ctrl.update);
router.delete('/:id', validate.update, handle, ctrl.remove);

module.exports = router;
