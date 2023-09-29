const express = require('express');
const router = express.Router();
const disciplinaryController = require('../controllers/disciplinary');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN]), disciplinaryController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN]), disciplinaryController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN]), disciplinaryController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), disciplinaryController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN]), disciplinaryController.detail);
router.put('/reorder', verifyToken([roles.ORG_ADMIN]), disciplinaryController.reorder);  // disciplinaries: [id,id,id]


module.exports = router;

