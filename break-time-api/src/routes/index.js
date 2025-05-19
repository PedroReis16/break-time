const { Router } = require('express');
const router = Router();

router.use('/students', require('./students'));
router.use('/auths', require('./authorizations'));
router.use('/deliveries', require('./deliveries'));

module.exports = router;
