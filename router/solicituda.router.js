const express = require('express');
const router = express.Router();
const auth = require("../services/auth-middleware")
const solicitudController = require('../controller/solicitudControllerA')


router.post("/addSolicitud", solicitudController.addSolicitud)
router.get("/getSolicitudesByEstado/:id/:entidad", solicitudController.getSolicitudesByEstado)
router.get("/getSolicitudById/:id", solicitudController.getSolicitudById)
router.post("/updateEstadoSolicitud", solicitudController.updateEstadoSolicitud)
router.post("/addRango", solicitudController.addRango)
router.get("/getRangosByEntity/:id", solicitudController.getRangosByEntity)
router.get("/getRangoById/:id", solicitudController.getRangoById)
module.exports = router