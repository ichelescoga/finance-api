const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const solicitudController = require('../controller/solicitudController')


router.post("/addSolicitud", solicitudController.addSolicitud)
module.exports = router