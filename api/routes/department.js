const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.post('/create', verifyToken, departmentController.create);
router.put('/update/:id', verifyToken, departmentController.update);
router.put('/delete/:id', verifyToken, departmentController.delete);
router.get('/list', verifyToken, departmentController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken, departmentController.detail); 

module.exports = router;

