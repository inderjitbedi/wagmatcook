const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { verifyOrgAdmin } = require('../middlewares/jwtMiddleware');
const authController = require('../controllers/auth');

router.put('/complete-signup/:token', authController.completeOrgAdminSignup);


module.exports = router;

