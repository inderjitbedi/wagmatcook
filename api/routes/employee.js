const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { verifyOrgAdmin } = require('../middlewares/jwtMiddleware');
const authController = require('../controllers/auth');
const employeeController = require('../controllers/employee');

router.post('/add', verifyOrgAdmin, employeeController.add);
router.get('/list', verifyOrgAdmin, employeeController.list);
router.put('/delete/:id', verifyOrgAdmin, employeeController.delete);
router.put('/personal-info/:id', verifyOrgAdmin, employeeController.updatePersonalInfo);
router.get('/personal-info/:id', verifyOrgAdmin, employeeController.getPersonalInfo);
router.put('/job-details/:id', verifyOrgAdmin, employeeController.updateJobDetails);
router.get('/job-details/:id', verifyOrgAdmin, employeeController.getJobDetails);


module.exports = router;

