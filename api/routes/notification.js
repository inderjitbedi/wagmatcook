const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');
const notificationController = require('../controllers/notification');

router.get('/list', verifyToken([roles.HR, roles.MANAGER, roles.EMPLOYEE]), notificationController.list);
router.put('/mark-read', verifyToken([roles.HR, roles.MANAGER, roles.EMPLOYEE]), notificationController.markRead);
router.put('/read-all', verifyToken([roles.HR, roles.MANAGER, roles.EMPLOYEE]), notificationController.markRead);
router.get('/unread-count', verifyToken([roles.HR, roles.MANAGER, roles.EMPLOYEE]), notificationController.unreadCount);

module.exports = router;
