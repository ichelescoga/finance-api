const cuotasService = require("../services/cuotaService");
const currentAccount = require("../services/pagoCuotasService");
const clientesService = require("../services/clienteService");
const { feeStatus, FEE_STATUS_NAMES } = require("../src/shared/finance-app/contants/payment_contant");

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
            idCotizacion: req.body.idCotizacion,
            idPago: req.body.idPago
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

exports.acceptPayment = async (req, res, next) => {
    try {
        const paymentId = req.body.paymentId;
        const acceptedPayment = FEE_STATUS_NAMES.PAYED
        
        cuotasService.updateAdminPaymentResolution(paymentId, acceptedPayment)

        res.status(200).json({
            success: true,
            message: "Pago actualizado con éxito",
        });
    } catch (error) {
        next(error);
    }
};

exports.rejectPayment = async (req, res, next) => {
    try {
        const paymentId = req.body.paymentId;
        const rejectedPayment = FEE_STATUS_NAMES.REJECTED
        cuotasService.updateAdminPaymentResolution(paymentId, rejectedPayment)
        res.status(200).json({
            success: true,
            message: "Pago actualizado con éxito"
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
        let statusPaymentId = req.params.paymentStatusId;
        let clientWithCurrentAccountBalance = await clientesService.usuariosCuentaCorriente(statusPaymentId);
        const longitud = clientWithCurrentAccountBalance.length;

        if (longitud >= 1) {
            res.status(200).json({
                success: true,
                data: clientWithCurrentAccountBalance,
            });
        } else {
            
            res.status(404).json({
                success: true,
                message: `No hay cuentas corrientes en estado ${feeStatus[statusPaymentId]} para el usuario `,
            });
        }
    } catch (error) {
        next(error);
    }
};




exports.tipoCuotas = async (req, res, next) => {
    try {
        let results = await clientesService.tiposCuotas(req.params.id);
        let unitsList = [];

        console.log(results)

        for (let i = 0; i < results["dataValues"]["COTIZACIONs"].length; i++) {
            const detail = results["dataValues"]["COTIZACIONs"][i]["UNIDAD_COTIZACIONs"];
            
            const paymentsByQuotes = results["dataValues"]["COTIZACIONs"][i]["CUENTA_CORRIENTEs"][0]["PAGOs"];

            const payments = paymentsByQuotes.map(pq => {
                return {
                    "paymentId": pq["Id_pago"],
                    "paymentFlowId": pq["Id_cuenta_corriente"],
                    "interest": pq["Interes"],
                    "lastPaymentDate": "Fecha_limite_pago",
                    "lateAmount": pq["Mora"],
                    "type": pq["Id_tipo_pago_TIPO_PAGO"]["Name_pago"],
                    "status": pq["Id_status_pago_STATUS_PAGO"]["Name_status"],
                    "amount": pq["Monto"],
                    "reference": pq["Referencia"]
                }
            })
            
            for (let x = 0; x < detail.length; x++) {
                const quote = detail[x]["dataValues"]["Id_unidad_UNIDAD"]["dataValues"];
                const quoteId = detail[x]["dataValues"]["Id_cotizacion"];
                unitsList.push({ 
                    quoteId,
                    unitId: quote["Id_unidad"],
                    projectId: quote["Id_proyecto"],
                    name: quote["Nombre_unidad"],
                    sellPrice: quote["Precio_Venta"],
                    payments
                })
            }
        }

        if (results) {
            res.status(200).json({
                success: true,
                data: unitsList,
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

exports.getVoucherByPaymentId = async (req, res, next) => { 
    try {
        const paymentId = req.params.paymentId
        const result = await clientesService.getVoucherByPaymentId(paymentId);
        if(!result) {
            return res.status(404).json({
                success: false,
                message: "Pago no encontrado"
            })
        }

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        next(error)
    }
} 

exports.cuentasCorrienteCotizacion = async (req, res, next) => {
    try {
        let results = await clientesService.findCtasCorrientesCotizacion(req.params.id);
        const longitud = results.length;

        if (longitud >= 1) {
            res.status(200).json({
                success: true,
                data: results,
            });
        } else {
            res.status(404).json({
                success: true,
                message: "No hay cuentas corrientes para esta cotizacion",
            });
        }
    } catch (error) {
        next(error);
    }
};