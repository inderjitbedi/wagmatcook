const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), documentController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), documentController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), documentController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), documentController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), documentController.detail);

module.exports = router;

