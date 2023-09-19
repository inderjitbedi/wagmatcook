const express = require('express');
const router = express.Router();
const employeeTypeController = require('../controllers/employeeType');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.post('/create', verifyToken, employeeTypeController.create);
router.put('/update/:id', verifyToken, employeeTypeController.update);
router.put('/delete/:id', verifyToken, employeeTypeController.delete);
router.get('/list', verifyToken, employeeTypeController.list); // /list?page=1&limit=10&searchKey=search_keyword
router.get('/detail/:id', verifyToken, employeeTypeController.detail); 

module.exports = router;

