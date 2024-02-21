const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const entityController = require('../controller/entityController')

router.get("/getComponents", entityController.getComponentsByEntity)
router.post("/addEntity", entityController.addEntity)

module.exports = router