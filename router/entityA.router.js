const express = require('express');
const router = express.Router();
const auth = require("../services/auth-middleware")
const entityController = require('../controller/entityControllerA')

router.get("/getComponents", entityController.getComponentsByEntity)
router.post("/addEntity", entityController.addEntity)
router.get("/getEntities", entityController.getEntities)
router.get("/getModsByEntity/:id_entidad/:id_mod", entityController.getModsByEntity)
router.get("/getEntityById/:id", entityController.getEntityById)
module.exports = router