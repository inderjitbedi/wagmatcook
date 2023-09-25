const express = require('express');
const router = express.Router();
const leaveTypeController = require('../controllers/leaveType');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.post('/create', verifyToken, leaveTypeController.create);
router.put('/update/:id', verifyToken, leaveTypeController.update);
router.put('/delete/:id', verifyToken, leaveTypeController.delete);
router.get('/list', verifyToken, leaveTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/emplyee-list/:employeeid', verifyToken, leaveTypeController.employeeLeaveTypeList); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken, leaveTypeController.detail);
router.put('/reorder', verifyToken, leaveTypeController.reorder);  // disciplinaries: [id,id,id]


module.exports = router;

