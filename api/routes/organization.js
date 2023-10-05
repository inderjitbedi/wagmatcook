const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { handleMulterError, verifyToken } = require('../middlewares/jwtMiddleware');
const upload = require('../providers/uploadFile');

const fileController = require('../controllers/file');
const roles = require('../enum/roles');

router.post('/register', verifyToken([roles.ORG_ADMIN]), orgController.create);
router.put('/update', verifyToken([roles.ORG_ADMIN]), orgController.update);
router.get('/details', verifyToken([roles.ORG_ADMIN]), orgController.details);
router.post('/file/upload/:type', verifyToken([roles.ORG_ADMIN]), upload.single('file'), handleMulterError, fileController.upload);
router.post('/send-welcome-email', orgController.sendWelcomeEmail);


module.exports = router;

