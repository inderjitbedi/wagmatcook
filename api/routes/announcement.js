const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post(
  "/create",
  verifyToken([roles.ORG_ADMIN, roles.HR]),
  announcementController.create
);
router.put('/update/:id', verifyToken([roles.SUPER_ADMIN, roles.ORG_ADMIN]), announcementController.update);
router.put(
  "/delete/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR]),
  announcementController.delete
);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), announcementController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), announcementController.detail); // /list?page=1&limit=10&searchKey=search_keyword



module.exports = router;

