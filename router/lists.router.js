const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const listsController = require('../controller/listsController')

router.get("/getClasificacionclientes", listsController.getClasificacionClientes)
router.get("/getBancos", listsController.getBancos)
router.get("/getTipoCuentasBancos", listsController.getTipoCuentasBanco)
module.exports = router
