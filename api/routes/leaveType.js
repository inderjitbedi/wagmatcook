const express = require('express');
const router = express.Router();
const leaveTypeController = require('../controllers/leaveType');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), leaveTypeController.create);
router.put('/update/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), leaveTypeController.update);
router.put('/delete/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), leaveTypeController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR,roles.PAYROLL, roles.MANAGER, roles.EMPLOYEE]), leaveTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/list/defaults', verifyToken([roles.SUPER_ADMIN]), leaveTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/employee-list/:employeeid', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN, roles.HR,roles.PAYROLL, roles.MANAGER, roles.EMPLOYEE]), leaveTypeController.employeeLeaveTypeList); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), leaveTypeController.detail);
router.put('/reorder', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), leaveTypeController.reorder);  // disciplinaries: [id,id,id]


module.exports = router;

