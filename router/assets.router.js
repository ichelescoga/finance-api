const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const assetsController = require('../controller/assetsController')

router.post("/uploadS3", auth.verifyToken, assetsController.uploadS3)

module.exports = router