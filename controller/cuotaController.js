const cuotasService = require("../services/cuotaService");
const currentAccount = require("../services/pagoCuotasService");
const clientesService = require("../services/clienteService");

exports.listcuotasServices = async (req, res, next) => {
    try {

        let paramsPagos = {
            idCuentaCorriente: req.body.idCuentaCorriente,
            // idTipoPago: req.params.id,
        }
        // const currentAccData = await currentAccount.findCurrentAccountByQuoteId(quoteId);

        let results = await cuotasService.findAllPagos(paramsPagos);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(200).json({
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

exports.getStatusOfBookDownPaymentTotalPayment = async (req, res, next) => {
    try {
        let doPayments = {
            book: false,
            downPayment: false,
            totalPayment: false
        }

        let quoteId = req.params.quoteId;
        const currentAccData = await currentAccount.findCurrentAccountByQuoteId(quoteId);
        if (currentAccData?.dataValues) {
            const payments = await cuotasService.getPaymentsByCurrentAccount(currentAccData?.dataValues?.Id_cuenta_corriente)
            const BOOK = 1;
            const DOWN_PAYMENT = 2
            const PAYMENT = 3;
            payments
                .map(e => {
                    if (e["dataValues"]["Id_tipo_pago"] === BOOK) {
                        doPayments.book = true;
                    } else if (e["dataValues"]["Id_tipo_pago"] === DOWN_PAYMENT) {
                        doPayments.downPayment = true;
                    } else if (e["dataValues"]["Id_tipo_pago"] === PAYMENT) { 
                        doPayments.totalPayment = true;
                    }
                    return e["dataValues"]
                })
        }
        res.status(200).json({
            ...doPayments
        })
    } catch (error) {

        console.log("ERROR ERROR ", error);
        res.status(404).json({
            error: "no found quote id or payments :/"
        })

    }

}

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




exports.usuariosCuota = async (req, res, next) => {
    try {
        let results = await clientesService.usuariosCuentaCorriente();

        const longitud = results.length;

        if (longitud >= 1) {
            res.status(200).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuentas corrientes para el usuario",
            });
        }
    } catch (error) {
        next(error);
    }
};




exports.tipoCuotas = async (req, res, next) => {
    try {
        let results = await clientesService.tiposCuotas(req.params.id);


        if (results) {
            res.status(200).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuentas corrientes ",
            });
        }
    } catch (error) {
        next(error);
    }
};




exports.tipoCuotasCuentaCorriente = async (req, res, next) => {
    try {
        let paramasCuota = {
            idCuentaCorriente: req.body.idCuentaCorriente,
            idTipoCuota: req.body.idTipoCuota
        }
        let results = await clientesService.tiposCuotasCuentaCorriente(paramasCuota);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(200).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuotas de ese tipo",
            });
        }
    } catch (error) {
        next(error);
    }
};




exports.pagosReferencia = async (req, res, next) => {
    try {
        let results = await clientesService.pagosReferencia(req.params.id);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(200).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay pagos referenciados a la cuota ",
            });
        }
    } catch (error) {
        next(error);
    }
};