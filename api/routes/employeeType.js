const express = require('express');
const router = express.Router();
const employeeTypeController = require('../controllers/employeeType');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN]), employeeTypeController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN]), employeeTypeController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN]), employeeTypeController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), employeeTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN]), employeeTypeController.detail);

module.exports = router;

