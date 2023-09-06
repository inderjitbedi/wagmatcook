const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { verifyOrgAdmin } = require('../middlewares/jwtMiddleware');
const authController = require('../controllers/auth');

router.get('/complete-signup/:token', verifyOrgAdmin, authController.completeOrgAdminSignup);


module.exports = router;

