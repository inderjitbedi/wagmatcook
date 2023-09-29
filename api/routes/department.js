const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN]), departmentController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN]), departmentController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN]), departmentController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), departmentController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN]), departmentController.detail);

module.exports = router;

