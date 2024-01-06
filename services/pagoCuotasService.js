const db = require("../src/models");

let userRepository = function () {

  let updatePorcentajeEnganche = async (params) => {
    const porcentajEnganche = await db.models.DETALLE_PORCENTAJE_ENGANCHE.findOne({ 
      where: { Id_detalle_porcentaje_enganche: params.idDetallePorcentajeEnganche } });

    if(!porcentajEnganche) {
       return
    } else {
        await db.models.DETALLE_PORCENTAJE_ENGANCHE.update({
          Fecha_inicial: params.fechaInicial,
          Fecha_final: params.fechaFinal,
          Id_proyecto: params.idProyecto,
          Status: params.status,
          Porcentaje: params.porcentaje,
      },{
        where:{Id_detalle_porcentaje_enganche: params.idDetallePorcentajeEnganche}
    });
    }
    const detallePorcentajeActualizado = await db.models.DETALLE_PORCENTAJE_ENGANCHE.findOne({ 
      where: { Id_detalle_porcentaje_enganche: params.idDetallePorcentajeEnganche } });
    return detallePorcentajeActualizado
  };

  let findCuentaCorriente = async (params) => {
    const cotizacion = await db.models.COTIZACION.findAll({
      where: { Id_cotizacion: params },
      include: [
        {
          model: db.models.CUENTA_CORRIENTE,
          as: "CUENTA_CORRIENTEs",
          required: true,
        },
      ],
    });
    return cotizacion;
  };

  let createCuotas = async (params) => {
    const newPago = await db.models.PAGO.create({
      Id_cuenta_corriente: params.idCuentaCorriente,
      Fecha: params.fecha,
      Monto: params.monto,
      Saldo: params.saldo,
      Interes: params.interes,
      Fecha_limite_pago: params.fechaLimitePago,
      Pago: params.pago,
      Pago_capital: params.pagoCapital,
      Referencia: params.referencia,
      Id_tipo_pago: params.idTipoPago,
      Id_status_transaccion: params.idStatusTransaccion,
      Id_status_pago: params.idStatusPago,
    });
    return newPago;
  };

  let findOneCotizacion = async (params) => {
    const cotizacion = await db.models.COTIZACION.findOne({
      where: { Id_cotizacion: params},
      include: [
        {
          model: db.models.UNIDAD_COTIZACION,
          as: "UNIDAD_COTIZACIONs",
          required: true,
          include: [
            {
              model: db.models.UNIDAD,
              as: "Id_unidad_UNIDAD",
              required: true,
            },
          ],
        },
      ],
    });
    return cotizacion;
  };
   return {
    createCuotas,
    findCuentaCorriente,
    updatePorcentajeEnganche,
    findOneCotizacion
  };
};

module.exports = userRepository();
