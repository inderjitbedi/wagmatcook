const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const verifyToken = require('../middlewares/jwtMiddleware');
const upload = require('../providers/uploadFile');
const fileController = require('../controllers/file');

router.post('/create', orgController.create);
router.post('/file/upload/:type', verifyToken, upload.single('file'), fileController.upload);


module.exports = router;
