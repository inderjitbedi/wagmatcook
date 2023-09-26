const express = require('express');
const router = express.Router();
const { verifyOrgAdmin } = require('../middlewares/jwtMiddleware');
const employeeController = require('../controllers/employee');
const { handleMulterError } = require('../middlewares/jwtMiddleware');
const upload = require('../providers/uploadFile');

const fileController = require('../controllers/file');

router.post('/add', verifyOrgAdmin, employeeController.add);
router.get('/list', verifyOrgAdmin, employeeController.list);
router.put('/delete/:id', verifyOrgAdmin, employeeController.delete);



/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee-related endpoints
 * /api/employee/personal-info/{employeeid}:
 *   put:
 *     summary: Update employee's personal information
 *     description: Update the personal information of an employee identified by their Employee ID.
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: employeeid
 *         in: path
 *         description: The Employee ID of the employee to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: The employee's updated personal information.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             dob:
 *               type: string
 *               format: date
 *             emergencyContact:
 *               type: string
 *             emergencyContactNumber:
 *               type: string
 *             employeeId:
 *               type: string
 *             firstName:
 *               type: string
 *             gender:
 *               type: integer
 *             homePhone:
 *               type: string
 *             isActive:
 *               type: boolean
 *             isDeleted:
 *               type: boolean
 *             isSignedup:
 *               type: boolean
 *             lastName:
 *               type: string
 *             mobile:
 *               type: string
 *             personalEmail:
 *               type: string
 *               format: email
 *             photo:
 *               type: string
 *             postalCode:
 *               type: string
 *             pronouns:
 *               type: string
 *             province:
 *               type: string
 *             sin:
 *               type: string
 *             workEmail:
 *               type: string
 *               format: email
 *     responses:
 *       200:
 *         description: Employee personal information updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/personal-info/:id', verifyOrgAdmin, employeeController.updatePersonalInfo);
router.get('/personal-info/:id', verifyOrgAdmin, employeeController.getPersonalInfo);

router.get('/header-info/:id', verifyOrgAdmin, employeeController.getEmployeeHeaderInfo);

router.put('/job-details/:id', verifyOrgAdmin, employeeController.updateJobDetails);
router.get('/job-details/:id', verifyOrgAdmin, employeeController.getJobDetails);
router.post('/job-details/position/:id', verifyOrgAdmin, employeeController.addPosition);

router.get('/reports-to-list', verifyOrgAdmin, employeeController.getReportsToList);
router.get('/completed-by-list', verifyOrgAdmin, employeeController.getCompletedByListWithSearch);

router.put('/benefit/:id', verifyOrgAdmin, employeeController.updateBenefit);
router.get('/benefit/:id', verifyOrgAdmin, employeeController.getBenefit);

router.put('/certificates/:id', verifyOrgAdmin, employeeController.updateCertificates);
router.get('/certificates/:id', verifyOrgAdmin, employeeController.getCertificates);
router.post('/certificate/:id', verifyOrgAdmin, employeeController.addCertificate);

router.post('/type', verifyOrgAdmin, employeeController.addType);
router.put('/type/:id', verifyOrgAdmin, employeeController.updateType);
router.get('/types', verifyOrgAdmin, employeeController.getTypes);

router.get('/reviews/:id', verifyOrgAdmin, employeeController.getReviews);
router.post('/review/:id', verifyOrgAdmin, employeeController.addReview);
router.put('/review/:id/:reviewid', verifyOrgAdmin, employeeController.updateReview);
router.put('/review/:id/delete/:reviewid', verifyOrgAdmin, employeeController.deleteReview);


router.get('/disciplinaries/:id', verifyOrgAdmin, employeeController.getDisciplinaries);
router.post('/disciplinary/:id', verifyOrgAdmin, employeeController.addDisciplinary);
router.put('/disciplinary/:id/:disciplinaryid', verifyOrgAdmin, employeeController.updateDisciplinary);
router.put('/disciplinary/:id/delete/:disciplinaryid', verifyOrgAdmin, employeeController.deleteDisciplinary);

router.post('/file/upload/:type', verifyOrgAdmin, upload.single('file'), handleMulterError, fileController.upload);

router.put('/documents/:id/delete/:documentid', verifyOrgAdmin, employeeController.deleteDocument);
router.get('/documents/:id', verifyOrgAdmin, employeeController.getDocuments);
router.post('/documents/:id', verifyOrgAdmin, employeeController.addDocument);

router.put('/leave-allocation/:id/delete/:allocationid', verifyOrgAdmin, employeeController.deleteLeaveAllocation);
router.put('/leave-allocation/:id/:allocationid', verifyOrgAdmin, employeeController.updateLeaveAllocation);
router.get('/leave-allocations/:id', verifyOrgAdmin, employeeController.getLeaveAllocations);
router.post('/leave-allocation/:id', verifyOrgAdmin, employeeController.addLeaveAllocation);

router.get('/leave-history/:id', verifyOrgAdmin, employeeController.getLeaveHistory);
router.get('/leave-history/:id/:requestid', verifyOrgAdmin, employeeController.getLeaveHistory);
router.post('/leave-history/:id/request', verifyOrgAdmin, employeeController.addLeaveRequest);
router.post('/send-welcome-email', employeeController.sendWelcomeEmail);



module.exports = router;
