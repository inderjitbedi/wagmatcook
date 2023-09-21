const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);








router.post('/login', authController.login);


router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/resend-temp-password/:email', authController.resendTempPassword);
router.post('/verify-user/:email/:tempPassword', authController.verifyUser);




/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /api/auth/login-with-otp:
 *   post:
 *     summary: Request OTP for login
 *     description: Request an OTP (One-Time Password) for user login.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: OTP sent successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/login-with-otp', authController.sendOtpForLogin);

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /api/auth/resend-otp/{email}:
 *   post:
 *     summary: Resend OTP to an email
 *     description: Resend an OTP (One-Time Password) to a specific email address.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: email
 *         in: path
 *         description: The email address to resend the OTP to
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: OTP resent successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/resend-otp/:email', authController.resendOtpForLogin);

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify an OTP (One-Time Password) provided in the request body.
 *     tags:
 *       - Auth
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address associated with the OTP.
 *               otp:
 *                 type: string
 *                 description: The One-Time Password (OTP) to be verified.
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             example:
 *               message: OTP verified successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/verify-otp', authController.loginWithOtp);


module.exports = router;
