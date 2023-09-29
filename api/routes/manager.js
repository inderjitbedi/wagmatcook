const express = require('express');
const router = express.Router();
const orgController = require('../controllers/organization');
const { handleMulterError, verifyToken } = require('../middlewares/jwtMiddleware');
const upload = require('../providers/uploadFile');

const fileController = require('../controllers/file');
const roles = require('../enum/roles');

router.get('/leave-history', verifyToken(roles.MANAGER), orgController.create);


module.exports = router;

