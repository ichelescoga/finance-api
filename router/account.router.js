const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const accountController = require('../controller/accountController')

router.post("/pmtCalculate", auth.verifyToken, accountController.pmtCalculate)

module.exports = router