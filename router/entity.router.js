const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const entityController = require('../controller/entityController')

router.get("/getComponents", entityController.getComponentsByEntity)


module.exports = router