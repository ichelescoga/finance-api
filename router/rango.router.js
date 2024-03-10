const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const rangontroller = require('../controller/rangoController')


module.exports = router
router.get("/getRangos", rangontroller.getRangos)
router.get("/getRangoById/:id", rangontroller.getRangoById)
router.post("/addRango", rangontroller.addRango)
router.get("/getRangoByCliente/:id", rangontroller.getRangoByCliente)