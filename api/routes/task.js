const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');
const taskController = require('../controllers/task');

router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), taskController.list);
router.post('/create', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), taskController.create);
router.put('/update', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), taskController.update);
router.put('/delete', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), taskController.delete);
router.put('/mark-complete', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), taskController.markComplete);
router.get('/details/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), taskController.details);
router.get('/assignees', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), taskController.assigneeList);

module.exports = router;
