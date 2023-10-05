const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefit');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN]), benefitController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN]), benefitController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN]), benefitController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER, roles.EMPLOYEE]), benefitController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN]), benefitController.detail);
router.put('/reorder', verifyToken([roles.ORG_ADMIN]), benefitController.reorder);  // disciplinaries: [id,id,id]

module.exports = router;

