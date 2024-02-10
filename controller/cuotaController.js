const cuotasService = require("../services/cuotaService");

exports.listcuotasServices = async (req, res, next) => {
    try {

        let paramsPagos = {
            idCuentaCorriente: req.body.idCuentaCorriente,
            idTipoPago: req.params.id,
        }

        let results = await cuotasService.findAllPagos(paramsPagos);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(202).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuotas con el tipo de cuota",
            });
        }
    } catch (error) {
        next(error);
    }
};


exports.listcuotasPagadasServices = async (req, res, next) => {
    try {

        let paramsPagos = {
            idCuentaCorriente: req.body.idCuentaCorriente,
            idTipoPago: req.params.id,
        }

        let results = await cuotasService.cuotasPagadas(paramsPagos);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(202).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuotas pagadas",
            });
        }
    } catch (error) {
        next(error);
    }
};



exports.listcuotasPendientesServices = async (req, res, next) => {
    try {

        let paramsPagos = {
            idCuentaCorriente: req.body.idCuentaCorriente,
            idTipoPago: req.params.id,
        }

        let results = await cuotasService.cuotasPendientes(paramsPagos);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(202).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuotas pendientes de pago",
            });
        }
    } catch (error) {
        next(error);
    }
};


exports.cuotasReferencia = async (req, res, next) => {
    try {

        let paramsPagos = {
            idCuota: req.params.id,
            idCuentaCorriente: req.body.idCuentaCorriente,
        }

        let results = await cuotasService.cuotasReferencia(paramsPagos);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(202).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuotas referencia de pago",
            });
        }
    } catch (error) {
        next(error);
    }
};




exports.createBoletaPagos = async (req, res, next) => {
    try {

        let paramsPagos = {
            referencia: req.body.referencia,
            url: req.body.url,
            idFormaPago: req.body.idFormaPago,
            idStatusPago: req.body.idStatusPago,
            idEstablecimiento: req.body.idEstablecimiento,
        }
        let results = await cuotasService.createBoletaPago(paramsPagos);


        res.status(200).json({
            succes: true,
            message: "Boleta creada con exito",
            data: results
          });
    } catch (error) {
        next(error);
    }
};





// exports.getReservaEngancheUnidad = async (req, res, next) => {
//     try {

//         let paramsPagos = {
//             idCuentaCorriente: req.body.idCuentaCorriente,
//             idTipoPago: req.params.id,
//         }

//         let results = await cuotasService.findAllPagos(paramsPagos);
//         const longitud = results.length;

//         if (longitud >= 1) {
//             res.status(202).json({
//                 success: true,
//                 data: results,
//             });
//         } else {
//             res.status(404).json({
//                 success: true,
//                 message: "No hay cuotas con el tipo de cuota",
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// };