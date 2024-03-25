const db = require("../src/models");
const { Op } = require("sequelize");
const { feeStatus, FEE_STATUS_NAMES } = require("../src/shared/finance-app/contants/payment_contant");


let userRepository = function () {



    let findAllPagos = async (params) => {
        const pagos = await db.models.PAGO.findAll({
            where: {
                [Op.and]: [
                    { Id_cuenta_corriente: params.idCuentaCorriente },
                    { Id_tipo_pago: params.idTipoPago },
                    { Id_status_transaccion: 1 },
                    { Categoria: "Principal" },
                ]
            },
        });
        return pagos;
    };

    let cuotasPagadas = async (params) => {
        const pagos = await db.models.PAGO.findAll({
            where: {
                [Op.and]: [
                    { Id_cuenta_corriente: params.idCuentaCorriente },
                    { Id_tipo_pago: params.idTipoPago },
                    { Id_status_transaccion: 1 },
                    { Id_status_pago: 3 },
                    { Categoria: "Principal" },
                ]
            },
        });
        return pagos;
    };


    let cuotasPendientes = async (params) => {
        const pagos = await db.models.PAGO.findAll({
            where: {
                [Op.and]: [
                    { Id_cuenta_corriente: params.idCuentaCorriente },
                    { Id_tipo_pago: params.idTipoPago },
                    { Id_status_transaccion: 1 },
                    { Id_status_pago: { [Op.in]: [1, 2] } },
                    { Categoria: "Principal" },
                ]
            },
        });
        return pagos;
    };


    let cuotasReferencia = async (params) => {
        const cuotas = await db.models.PAGO.findAll({
            where: {
                [Op.and]: [
                    { Referencia: params.idCuota },
                    { Id_status_pago: 5 },
                    { Id_status_transaccion: 1 },
                    { Id_cuenta_corriente: params.idCuentaCorriente },
                    { Categoria: "Secundaria" },
                ]
            },
        });
        return cuotas;
    };



    let createBoletaPago = async (params) => {
        const newBoletaPago = await db.models.BOLETA_PAGO.create({
            Referencia: params.referencia,
            Url: params.url,
            Id_forma_pago: params.idFormaPago,
            Id_status_pago: params.idStatusPago,
            Id_establecimiento: params.idEstablecimiento,
            Id_cotizacion: params.idCotizacion,
            Id_pago: params.idPago
        });
        const verificationStatus = FEE_STATUS_NAMES.VERIFICATION
        await updatePaymentStatusById(params.id_pago, verificationStatus)
        return newBoletaPago;
    };

    let updatePaymentStatusById = async (paymentId, status) => {
        await db.models.PAGO.update({ Id_status_pago: status }, {
            where: { Id_pago: paymentId }
        })
    }

    let updatePaymentVoucher = async (voucherId, status) => {
        await db.models.BOLETA_PAGO.update({ Id_status_pago: status }, {
            where: { Id_boleta_pago: voucherId }
        })
    }

    let updateAdminPaymentResolution = async (paymentId, status) => {
        const paymentData = await db.models.PAGO.findOne({ where: { Id_pago: paymentId } })
        console.log(paymentData["dataValues"])
        const voucherId = paymentData["dataValues"]["Id_boleta_pago"];
        if (voucherId == null) throw new Error("Voucher id comes empty");

        const paymentResult = await updatePaymentStatusById(paymentId, status)
        const voucherResult = await updatePaymentVoucher(voucherId, status)

        console.log("paymentResult", paymentResult)
        console.log("voucherResult", voucherResult)
    }

    let getPaymentsByCurrentAccount = async (currentAccId) => {
        return db.models.PAGO.findAll({
            where: { Id_cuenta_corriente: currentAccId }
        })
    }

    return {
        findAllPagos,
        cuotasPagadas,
        cuotasPendientes,
        cuotasReferencia,
        createBoletaPago,
        getPaymentsByCurrentAccount,
        updateAdminPaymentResolution
    };
};

module.exports = userRepository();
