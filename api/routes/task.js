const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtMiddleware');
const roles = require('../enum/roles');
const taskController = require('../controllers/task');

router.get(
  "/list",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.list
);
router.post(
  "/create",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  taskController.create
);
router.put(
  "/update/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  taskController.update
);
router.put(
  "/delete/:id",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  taskController.delete
);
router.put(
  "/mark-complete/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.markComplete
);
router.get(
  "/details/:id",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.details
);

router.get(
  "/assignees",
  verifyToken([roles.ORG_ADMIN, roles.HR, roles.PAYROLL, roles.MANAGER]),
  taskController.assigneeList
);

router.get(
  "/:taskid/comments",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.listComments
);
router.post(
  "/:taskid/comment/add",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.addComment
);
router.put(
  "/:taskid/comment/:id/update",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.updateComment
);
router.put(
  "/:taskid/comment/:id/delete",
  verifyToken([
    roles.ORG_ADMIN,
    roles.HR,
    roles.PAYROLL,
    roles.MANAGER,
    roles.EMPLOYEE,
  ]),
  taskController.deleteComment
);

module.exports = router;
