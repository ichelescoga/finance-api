const db = require("../src/models");
const { Op } = require("sequelize");

let userRepository = function () {

  let findOneProyectoDetallePorcentajeReserva = async (params) => {
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
                      model: db.models.DETALLE_PORCENTAJE_RESERVA,
                      as: "DETALLE_PORCENTAJE_RESERVAs",
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


  let createDetallReserva = async (params) => {
    const newPorcentajeReserva = await db.models.DETALLE_PORCENTAJE_RESERVA.create({
      Fecha_inicial: params.fechaInicial,
      Fecha_final: params.fechaFinal,
      Id_proyecto: params.idProyecto,
      Status: params.status,
      Porcentaje: params.porcentaje,
    });
    return newPorcentajeReserva;
  };


  let updatePorcentajeReserva = async (params) => {
    const porcentajeReserva = await db.models.DETALLE_PORCENTAJE_RESERVA.findOne({
      where: { Id_detalle_porcentaje_reserva: params.idDetallePorcentajeReserva }
    });

    if (!porcentajeReserva) {
      return
    } else {
      await db.models.DETALLE_PORCENTAJE_RESERVA.update({
        Fecha_inicial: params.fechaInicial,
        Fecha_final: params.fechaFinal,
        Id_proyecto: params.idProyecto,
        Status: params.status,
        Porcentaje: params.porcentaje,
      }, {
        where: { Id_detalle_porcentaje_reserva: params.idDetallePorcentajeReserva }
      });
    }
    const detallePorcentajeActualizado = await db.models.DETALLE_PORCENTAJE_RESERVA.findOne({
      where: { Id_detalle_porcentaje_reserva: params.idDetallePorcentajeReserva }
    });
    return detallePorcentajeActualizado
  };

  let findPorcentajesReserva = async (params) => {
    const cotizacion = await db.models.DETALLE_PORCENTAJE_RESERVA.findAll({
      where: { Id_proyecto: params },
    });
    return cotizacion;
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

  let findOneCotizacion = async (params) => {
    const cotizacion = await db.models.COTIZACION.findOne({
      where: { Id_cotizacion: params },
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

  let createReserva = async (params) => {
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
      Categoria: params.categoria
    });
    return newPago;
  };

  let updateCotizEstado = async (params) => {
    const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });

    if (!cotizacion) {
      return
    } else {
      await db.models.COTIZACION.update({
        Id_estado: params.idEstado,
      }, {
        where: {
          Id_cotizacion: params.id
        }
      });
    }
    const cotizacionActualizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });
    return cotizacionActualizada
  };

  let updatestateUnidad = async (params) => {
    const getUnidad = await db.models.UNIDAD.findOne({ where: { Id_unidad: params.id } });
    if (!getUnidad) {
      return
    } else {
      await db.models.UNIDAD.update({
        Id_estado: params.idEstado,
      }, {
        where: {
          Id_unidad: params.id
        }
      });
    }
    const unidadActualizada = await db.models.UNIDAD.findOne({ where: { Id_unidad: params.id } });
    return unidadActualizada
  };

  let findOneCuota = async (params) => {
    const cuotas = await db.models.PAGO.findOne({
      where: { Id_pago: params },
    });
    return cuotas;
  };

  let pagoRealizado = async (params) => {
    const cuotaPago = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    if (!cuotaPago) {
      return
    } else {
      await db.models.PAGO.update({
        // Pago: params.cuotaPago,
        Id_status_pago: params.statusPago,
      }, {
        where: {
          Id_pago: params.idCuotaPago
        }
      });
    }
    const cuotaPagoActualizada = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    return cuotaPagoActualizada
  };

  let createPagoReserva = async (params) => {
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

  let findReservas = async (params) => {
    const cotizacion = await db.models.CUENTA_CORRIENTE.findOne({
      where: { Id_cotizacion: params.idCotizacion },
      include: [
        {
          model: db.models.PAGO,
          as: "PAGOs",
          where: {
            [Op.and]: [
                { Id_tipo_pago:  { [Op.in]: [1, 2] }},
                { Categoria: "Principal" },
            ]
        },
        include: [
          {
            model: db.models.TIPO_PAGO,
            as: "Id_tipo_pago_TIPO_PAGO",
          },
        ],
        },
      ],
    });

    return cotizacion
  };




  let findOneValoresTotales = async (params) => {
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
              required: true,
              include: [
                {
                  model: db.models.PROYECTO,
                  as: "Id_proyecto_PROYECTO",
                  attributes: ["Id_proyecto"],
                  required: true,
                  include: [
                    {
                      model: db.models.DETALLE_PORCENTAJE_RESERVA,
                      as: "DETALLE_PORCENTAJE_RESERVAs",
                      where: { Status: 1 },
                    },
                    {
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

  return {
    findOneProyectoDetallePorcentajeReserva,
    createDetallReserva,
    updatePorcentajeReserva,
    findPorcentajesReserva,
    findCuentaCorriente,
    createCuentaCorriente,
    findOneCotizacion,
    createReserva,
    updateCotizEstado,
    updatestateUnidad,
    findOneCuota,
    pagoRealizado,
    createPagoReserva,
    findReservas,
    findOneValoresTotales
  };
};

module.exports = userRepository();
