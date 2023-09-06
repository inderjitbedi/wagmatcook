const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { verifySuperAdmin } = require('../middlewares/jwtMiddleware');

router.get('/list', verifySuperAdmin, orgController.list);
router.post('/invite', verifySuperAdmin, orgController.initiate);


module.exports = router;

