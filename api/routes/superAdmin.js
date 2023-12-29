const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { verifySuperAdmin } = require('../middlewares/jwtMiddleware');

router.get('/organization-list', verifySuperAdmin, orgController.listOrganizationsWithPrimaryUsers);
router.post('/invite', verifySuperAdmin, orgController.initiate);
router.put('/organization-admin/update/:organizationid/:userid', verifySuperAdmin, orgController.saUpdateOrgAdmin);
router.post(
  "/resend-invite/:organizationid/:userid",
  verifySuperAdmin,
  orgController.resendInvitation
);



module.exports = router;

