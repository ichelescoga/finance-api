const aprobacionPagoService = require("../services/aprobacionPagoService");
const moment = require('moment')

exports.aprobacionPagoClienteProyecto = async (req, res, next) => {
    try {
            let paramsAprobacion={
                idProyecto: req.body.idProyecto,
                idStatusPago: req.body.idStatusPago
            }
            let results = await aprobacionPagoService.listClientes(paramsAprobacion);
        const longitud = results.length;

        if (longitud >= 1) {
            res.json(results);
        } else {
            res.status(202).json({
                success: true,
                message: "No hay Boletas de pagos aprobadas",
            });
        }
    } catch (error) {
        next(error);
    }
};
