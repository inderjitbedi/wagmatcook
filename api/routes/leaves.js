const express = require('express');
const router = express.Router();
const { verifyOrgAdmin } = require('../middlewares/jwtMiddleware');
const employeeController = require('../controllers/employee');

router.post('/type', verifyOrgAdmin, employeeController.addType);
router.put('/type/:id', verifyOrgAdmin, employeeController.updateType);
router.get('/types', verifyOrgAdmin, employeeController.getTypes);


module.exports = router;
