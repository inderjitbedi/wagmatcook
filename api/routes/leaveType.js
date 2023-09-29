const express = require('express');
const router = express.Router();
const leaveTypeController = require('../controllers/leaveType');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN]), leaveTypeController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN]), leaveTypeController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN]), leaveTypeController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), leaveTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/employee-list/:employeeid', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), leaveTypeController.employeeLeaveTypeList); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN]), leaveTypeController.detail);
router.put('/reorder', verifyToken([roles.ORG_ADMIN]), leaveTypeController.reorder);  // disciplinaries: [id,id,id]


module.exports = router;

