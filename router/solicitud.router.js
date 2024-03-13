const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const solicitudController = require('../controller/solicitudController')


router.post("/addSolicitud", solicitudController.addSolicitud)
router.get("/getSolicitudesByEstado/:id/:entidad", solicitudController.getSolicitudesByEstado)

router.get("/getSolicitudesByEstado/:quoteStatus", solicitudController.getQuotesRequestClients)

router.get("/getSolicitudById/:id", solicitudController.getSolicitudById)
router.post("/updateEstadoSolicitud", solicitudController.updateEstadoSolicitud)
module.exports = router