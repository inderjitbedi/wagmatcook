const express = require('express');
const router = express.Router();
const disciplinaryController = require('../controllers/disciplinary');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.post('/create', verifyToken, disciplinaryController.create);
router.put('/update/:id', verifyToken, disciplinaryController.update);
router.put('/delete/:id', verifyToken, disciplinaryController.delete);
router.get('/list', verifyToken, disciplinaryController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken, disciplinaryController.detail);
router.put('/reorder', verifyToken, disciplinaryController.reorder);  // disciplinaries: [id,id,id]


module.exports = router;

