const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefit');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.post('/create', verifyToken, benefitController.create);
router.put('/update/:id', verifyToken, benefitController.update);
router.put('/delete/:id', verifyToken, benefitController.delete);
router.get('/list', verifyToken, benefitController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken, benefitController.detail); 

module.exports = router;

