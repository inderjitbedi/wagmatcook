const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');

router.post('/create', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.create);
router.put('/update/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.update);
router.put('/delete/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.delete);
router.get('/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.list);
router.get('/detail/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.detail);


router.post('/:jobid/applicant/create', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.createApplicant);
router.put('/:jobid/applicant/update/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.updateApplicant);
router.put('/:jobid/applicant/delete/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.deleteApplicant);
router.get('/:jobid/applicant/list', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.applicantList);
router.get('/:jobid/applicant/detail/:id', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.applicantDetail);

router.put('/:jobid/applicant/reorder', verifyToken([roles.ORG_ADMIN, roles.HR, roles.MANAGER]), jobController.applicantReorder);

module.exports = router;

