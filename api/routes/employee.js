const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtMiddleware");
const employeeController = require("../controllers/employee");
const { handleMulterError } = require("../middlewares/jwtMiddleware");
const upload = require("../providers/uploadFile");

const fileController = require("../controllers/file");
const roles = require("../enum/roles");

router.post(
  "/add",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.add
);
router.get(
  "/list",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.list
);
router.get(
  "/list/manager",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.listForManager
);
router.get(
  "/list/BebEligible",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.listBebEligible
);
router.get(
  "/BebEligible/generatePdf",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.generatePdf
);

router.put(
  "/delete/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.delete
);

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
router.put(
  "/personal-info/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.updatePersonalInfo
);
router.get(
  "/personal-info/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getPersonalInfo
);

router.get(
  "/header-info/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getEmployeeHeaderInfo
);

router.put(
  "/job-details/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.updateJobDetails
);
router.get(
  "/job-details/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getJobDetails
);
router.post(
  "/job-details/position/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.addPosition
);

router.get(
  "/reports-to-list",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getReportsToList
);
router.get(
  "/completed-by-list",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getCompletedByListWithSearch
);

router.put(
  "/benefit/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.updateBenefit
);
router.get(
  "/benefit/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getBenefit
);

router.put(
  "/certificates/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.updateCertificates
);
router.get(
  "/certificates/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getCertificates
);
router.post(
  "/certificate/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.addCertificate
);
router.put(
  "/certificate/:id/:certificateid",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.updateCertificate
);
router.put(
  "/certificate/:id/delete/:certificateid",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.deleteCertificate
);

router.post(
  "/type",
  verifyToken([roles.ORG_ADMIN]),
  employeeController.addType
);
router.put(
  "/type/:id",
  verifyToken([roles.ORG_ADMIN]),
  employeeController.updateType
);
router.get(
  "/types",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getTypes
);

router.get(
  "/reviews/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getReviews
);
router.post(
  "/review/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.addReview
);
router.put(
  "/review/:id/:reviewid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.updateReview
);
router.put(
  "/review/:id/delete/:reviewid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.deleteReview
);

router.get(
  "/disciplinaries/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getDisciplinaries
);
router.post(
  "/disciplinary/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.addDisciplinary
);
router.put(
  "/disciplinary/:id/:disciplinaryid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.updateDisciplinary
);
router.put(
  "/disciplinary/:id/delete/:disciplinaryid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.deleteDisciplinary
);

router.post(
  "/file/upload/:type",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  upload.single("file"),
  handleMulterError,
  fileController.upload
);

router.get(
  "/documents/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getDocuments
);
router.post(
  "/documents/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.addDocument
);
router.put(
  "/documents/:id/delete/:documentid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.deleteDocument
);

router.put(
  "/leave-allocation/:id/:allocationid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.updateLeaveAllocation
);
router.get(
  "/leave-allocations/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getLeaveAllocations
);
router.post(
  "/leave-allocation/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.addLeaveAllocation
);
router.put(
  "/leave-adjustment/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.updateLeaveAllocationBalance
);
router.get(
  "/leave-adjustment/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getLeaveAdjustment
);
router.put(
  "/leave-allocation/:id/delete/:allocationid",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.deleteLeaveAllocation
);

router.get(
  "/leave-history/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getLeaveHistory
);
router.put(
  "/leave-history/:id/delete/:leaveid",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.deleteLeaveHistory
);

router.get(
  "/leave-history/:id/:requestid",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.getLeaveHistory
);
router.post(
  "/leave-history/:id/request",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.addLeaveRequest
);
router.get(
  "/active-list",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.getActiveList
);

router.get(
  "/leave-balance",
  verifyToken([roles.HR, roles.PAYROLL, roles.MANAGER, roles.EMPLOYEE]),
  employeeController.getLeaveBalance
);
router.put(
  "/offboard",
  verifyToken([roles.HR, roles.PAYROLL, roles.MANAGER, roles.ORG_ADMIN]),
  employeeController.offboard
);
router.get(
  "/offboarding-list",
  verifyToken([roles.HR, roles.PAYROLL, roles.MANAGER, roles.ORG_ADMIN]),
  employeeController.offboardingList
);

router.post(
  "/welcome-email",
  verifyToken([roles.ORG_ADMIN]),
  employeeController.sendWelcomeEmail
);
router.get(
  "/unwelcomed/list",
  verifyToken([roles.ORG_ADMIN]),
  employeeController.unwelcomedList
);
router.get(
  "/org-chart/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.orgChartData
);
// Create recognition
router.post(
  "/recognitions/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  employeeController.createRecognition
);

// Update recognition
router.put(
  "/recognitions/:id/:recognitionId",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.updateRecognition
);

// Delete recognition
router.put(
  "/recognitions/:id/delete/:recognitionId",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL]),
  employeeController.deleteRecognition
);

// List recognitions for a specific employee
router.get(
  "/recognitions/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  employeeController.listRecognition
);

module.exports = router;
