const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtMiddleware');
const employeeController = require('../controllers/employee');
const roles = require('../enum/roles');
const leaveController = require('../controllers/leave');

router.post('/type', verifyToken([roles.ORG_ADMIN]), employeeController.addType);
router.put('/type/:id', verifyToken([roles.ORG_ADMIN]), employeeController.updateType);
router.get('/types', verifyToken([roles.ORG_ADMIN]), employeeController.getTypes);



router.get('/history', verifyToken([roles.HR, roles.MANAGER, roles.EMPLOYEE]), leaveController.list);
router.get('/history/:id/:requestid', verifyToken([roles.HR, roles.MANAGER, roles.EMPLOYEE]), employeeController.getLeaveRequest);
router.put('/history/:id/:requestid/respond', verifyToken([roles.HR, roles.MANAGER]), employeeController.respondLeaveRequest);



module.exports = router;
