const express = require('express');
const router = express.Router();
const employeeTypeController = require('../controllers/employeeType');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), employeeTypeController.create);
router.put('/update/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), employeeTypeController.update);
router.put('/delete/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), employeeTypeController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE,roles.PAYROLL]), employeeTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/list/defaults', verifyToken([roles.SUPER_ADMIN]), employeeTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), employeeTypeController.detail);
router.put('/reorder', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), employeeTypeController.reorder);  // disciplinaries: [id,id,id]

module.exports = router;

