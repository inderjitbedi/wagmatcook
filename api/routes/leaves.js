const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtMiddleware');
const employeeController = require('../controllers/employee');
const roles = require('../enum/roles');

router.post('/type', verifyToken([roles.ORG_ADMIN]), employeeController.addType);
router.put('/type/:id', verifyToken([roles.ORG_ADMIN]), employeeController.updateType);
router.get('/types', verifyToken([roles.ORG_ADMIN]), employeeController.getTypes);


module.exports = router;
