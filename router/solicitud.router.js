const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const solicitudController = require('../controller/solicitudController')


router.post("/addSolicitud", solicitudController.addSolicitud)
router.get("/getSolicitudesByEstado/:id/:entidad", solicitudController.getSolicitudesByEstado)
router.get("/getSolicitudById/:id", solicitudController.getSolicitudById)
router.post("/updateEstadoSolicitud", solicitudController.updateEstadoSolicitud)
router.get("/getClienteById/:id", solicitudController.getClientebyId)
module.exports = router