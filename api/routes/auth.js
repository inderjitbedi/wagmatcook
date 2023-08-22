const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/resend-temp-password/:email', authController.resendTempPassword);
router.post('/verify-user/:email/:tempPassword', authController.verifyUser);

module.exports = router;
