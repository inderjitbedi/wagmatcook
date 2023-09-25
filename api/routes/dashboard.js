const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');
const departmentController = require('../controllers/department');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.get('/employee/list', verifyToken, employeeController.dashboardList);
router.get('/department/list', verifyToken, departmentController.dashboardList); // /list?page=1&limit=10&searchKey=search_keyword


module.exports = router;

