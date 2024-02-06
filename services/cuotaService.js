const db = require("../src/models");
const { Op } = require("sequelize");


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
        });
        return newBoletaPago;
    };

    return {
        findAllPagos,
        cuotasPagadas,
        cuotasPendientes,
        cuotasReferencia,
        createBoletaPago
    };
};

module.exports = userRepository();
