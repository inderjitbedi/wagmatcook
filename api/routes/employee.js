const express = require('express');
const router = express.Router();
const { verifyOrgAdmin } = require('../middlewares/jwtMiddleware');
const employeeController = require('../controllers/employee');

router.post('/add', verifyOrgAdmin, employeeController.add);
router.get('/list', verifyOrgAdmin, employeeController.list);
router.put('/delete/:id', verifyOrgAdmin, employeeController.delete);
router.put('/personal-info/:id', verifyOrgAdmin, employeeController.updatePersonalInfo);
router.get('/personal-info/:id', verifyOrgAdmin, employeeController.getPersonalInfo);
router.put('/job-details/:id', verifyOrgAdmin, employeeController.updateJobDetails);
router.get('/job-details/:id', verifyOrgAdmin, employeeController.getJobDetails);
router.post('/job-details/position/:id', verifyOrgAdmin, employeeController.addPosition);
router.put('/benefit/:id', verifyOrgAdmin, employeeController.updateBenefit);
router.get('/benefit/:id', verifyOrgAdmin, employeeController.getBenefit);
router.put('/certificates/:id', verifyOrgAdmin, employeeController.updateCertificates);
router.get('/certificates/:id', verifyOrgAdmin, employeeController.getCertificates);
module.exports = router;
