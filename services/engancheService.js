const db = require("../src/models");

let userRepository = function () {

  let findOneProyectoDetallePorcentajeEnganche = async (params) => {
    const cotizacion = await db.models.COTIZACION.findOne({
      where: { Id_cotizacion: params },
      include: [
        {
          model: db.models.UNIDAD_COTIZACION,
          as: "UNIDAD_COTIZACIONs",
          attributes: ["Id_unidad_cotizacion"],
          required: true,
          include: [
            {
              model: db.models.UNIDAD,
              as: "Id_unidad_UNIDAD",
              attributes: ["Id_unidad"],
              required: true,
              include: [
                {
                  model: db.models.PROYECTO,
                  as: "Id_proyecto_PROYECTO",
                  attributes: ["Id_proyecto"],
                  required: true,
                  include: [
                    {
                      required: true,
                      model: db.models.DETALLE_PORCENTAJE_ENGANCHE,
                      as: "DETALLE_PORCENTAJE_ENGANCHEs",
                      where: { Status: 1 },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    return cotizacion;
  };




  let findOneReservaValor = async (params) => {
    const cotizacion = await db.models.COTIZACION.findOne({
      where: { Id_cotizacion: params },
      include: [
          {
          model: db.models.CUENTA_CORRIENTE,
          as: "CUENTA_CORRIENTEs",
          attributes: ["Id_cuenta_corriente"],
          required: true,
          include: [
            {
              model: db.models.PAGO,
              as: "PAGOs",
              required: true,
              include: [
                {
                  model: db.models.STATUS_PAGO,
                  as: "Id_status_pago_STATUS_PAGO",
                  required: true,
                  attributes: ["Id_status_pago", "Name_status"],
                },{
                  model: db.models.STATUS_TRANSACCION,
                  as: "Id_status_transaccion_STATUS_TRANSACCION",
                  required: true,
                  attributes: ["Id_status_transaccion", "Name_transaccion"],
                },{
                  model: db.models.TIPO_PAGO,
                  as: "Id_tipo_pago_TIPO_PAGO",
                  required: true,
                  attributes: ["Id_tipo_pago", "Name_pago"],
                },
              ],
            },
          ],
        },
      ],
    });
    return cotizacion;
  };


  let createDetallEnganche = async (params) => {
    const newPorcentajeEnganche = await db.models.DETALLE_PORCENTAJE_ENGANCHE.create({
      Fecha_inicial: params.fechaInicial,
      Fecha_final: params.fechaFinal,
      Id_proyecto: params.idProyecto,
      Status: params.status,
      Porcentaje: params.porcentaje,
    });
    return newPorcentajeEnganche;
  };


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

  let findPorcentajesEnganche = async (params) => {
    const cotizacion = await db.models.DETALLE_PORCENTAJE_ENGANCHE.findAll({
      where: { Id_proyecto: params },
    });
    return cotizacion;
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

  let createCuentaCorriente = async (params) => {
    const cuentaCorriente = await db.models.CUENTA_CORRIENTE.create({
      Id_cliente: params.idCliente,
      Id_cotizacion: params.idCotizacion,
    });
    return cuentaCorriente;
  };

  let createEnganche = async (params) => {
    const newPago = await db.models.PAGO.create({
      Id_cuenta_corriente: params.idCuentaCorriente,
      Fecha: params.fecha,
      Monto: params.monto,
      Saldo: params.saldo,
      Interes: params.interes,
      Fecha_limite_pago: params.fechaLimitePago,
      Pago: params.pago,
      Referencia: params.referencia,
      Id_tipo_pago: params.idTipoPago,
      Id_status_transaccion: params.idStatusTransaccion,
      Id_status_pago: params.idStatusPago,
      Mora: params.mora,
      Categoria: params.categoria,
      Mora: params.mora,
      Categoria: params.categoria
    });
    return newPago;
  };

  let updateCotizEstado = async (params) => {
    const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });

    if(!cotizacion) {
       return
    } else {
        await db.models.COTIZACION.update({
        Id_estado: params.idEstado,
      },{
        where:{
          Id_cotizacion: params.id
        }
    });
    }
    const cotizacionActualizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });
    return cotizacionActualizada
  };

  let updatestateUnidad = async (params) => {
    const getUnidad = await db.models.UNIDAD.findOne({ where: { Id_unidad: params.id } });
    if(!getUnidad) {
       return
    } else {
        await db.models.UNIDAD.update({
        Id_estado: params.idEstado,
      },{
        where:{
          Id_unidad: params.id
        }
    });
    }
    const unidadActualizada = await db.models.UNIDAD.findOne({ where: { Id_unidad: params.id } });
    return unidadActualizada
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




  let findAllCuotaReserva = async (params) => {
    const cuotas = await db.models.PAGO.findOne({
      where: { 
        Id_cuenta_corriente: params.idCuentaCorriente,
        Categoria : "Principal",
        Id_tipo_pago: 1
        },
    });
    return cuotas
  };

  let findAllCuotaPagoReserva = async (params) => {
    const cuotas = await db.models.PAGO.findOne({
      where: { 
        Referencia: params
        },
    });
    return cuotas
  };

  let findOneCuota = async (params) => {
    const cuotas = await db.models.PAGO.findOne({ 
      where: { Id_pago: params },
    });
    return cuotas;
  };

  let pagoRealizado = async (params) => {
    const cuotaPago = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    if(!cuotaPago) {
       return
    } else {
        await db.models.PAGO.update({
        // Pago: params.cuotaPago,
        Id_status_pago: params.statusPago,
      },{
        where:{
          Id_pago: params.idCuotaPago
        }
    });
    }
    const cuotaPagoActualizada = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    return cuotaPagoActualizada
  };

  let createPagoEnganche = async (params) => {
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
      Mora: params.mora,
      Categoria: params.categoria,
      Mora: params.mora,
      Categoria: params.categoria
    });
    return newPago;
  };
  return {
    findOneProyectoDetallePorcentajeEnganche,
    createDetallEnganche,
    updatePorcentajeEnganche,
    findPorcentajesEnganche,
    findOneReservaValor,
    findOneCotizacion,
    createEnganche,
    updateCotizEstado,
    updatestateUnidad,
    createCuentaCorriente,
    findCuentaCorriente,
    findAllCuotaReserva,
    findAllCuotaPagoReserva,
    findOneCuota,
    pagoRealizado,
    createPagoEnganche
  };
};

module.exports = userRepository();
