const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { handleMulterError, verifyToken } = require('../middlewares/jwtMiddleware');
const upload = require('../providers/uploadFile');

const fileController = require('../controllers/file');

router.post('/register', verifyToken, orgController.create);
router.post('/file/upload/:type', verifyToken, upload.single('file'), handleMulterError, fileController.upload);
router.get('/list', orgController.list);
router.post('/invite',  orgController.initiate);



module.exports = router;

