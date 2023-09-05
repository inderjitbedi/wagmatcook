const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/resend-temp-password/:email', authController.resendTempPassword);
router.post('/verify-user/:email/:tempPassword', authController.verifyUser);

router.post('/send-otp', authController.sendOtpForLogin);
router.post('/verify-otp', authController.loginWithOtp);


module.exports = router;
