const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');
const departmentController = require('../controllers/department');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.get('/employee/list', verifyToken([roles.ORG_ADMIN]), employeeController.dashboardList);
router.get('/department/list', verifyToken([roles.ORG_ADMIN]), departmentController.dashboardList); // /list?page=1&limit=10&searchKey=search_keyword


module.exports = router;

