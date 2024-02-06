const db = require("../src/models");
const { Op } = require("sequelize");
const moment = require('moment')

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
      Mora: params.mora,
      Categoria: params.categoria,
      Mora: params.mora,
      Categoria: params.categoria
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



  let pagoRealizado = async (params) => {
    const cuotaPago = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    if(!cuotaPago) {
       return
    } else {
        await db.models.PAGO.update({
        Pago: params.cuotaPago,
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

  let findOneCuota = async (params) => {
    const cuotas = await db.models.PAGO.findOne({ 
      where: { Id_pago: params },
    });
    return cuotas;
  };


  let findOneCuotasReferencia = async (params) => {
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Referencia: params },
          { Id_tipo_pago: 3},
          { Id_status_transaccion: 1},
        ]
      },
      order: [
        ['Id_pago' , 'DESC']
      ],
    });
    return cuotas;
  };


  let findAllCuota = async (params) => {
    const cuotas = await db.models.PAGO.findAll({
      where: {
        [Op.and]: [
          {Id_cuenta_corriente: params.idCuentaCorriente},
          {Id_pago: {[Op.gt]: params.idPago }},
          {Categoria : "Principal"},
          {Id_tipo_pago: 3}
        ]
      },
    });
    return cuotas
  };


  let desabilitarCuota = async (params) => {
    const cuotaPago = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    if(!cuotaPago) {
       return
    } else {
        await db.models.PAGO.update({
        Id_status_pago: params.statusPago,
        Id_status_transaccion: params.idStatusTransaccion
      },{
        where:{
          Id_pago: params.idCuotaPago
        }
    });
    }
    const cuotaPagoActualizada = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    return cuotaPagoActualizada
  };

  let pagoCuota = async (params) => {
    const cuotaPago = await db.models.PAGO.findOne({ where: { Id_pago: params.idCuotaPago } });
    if(!cuotaPago) {
       return
    } else {
        await db.models.PAGO.update({
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


  let findCuotasPagadas = async (params) => {
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Id_cuenta_corriente: params.idCuentaCorriente},
          { Id_tipo_pago: 3},
          { Id_status_pago: 3},
        ]
      },
      order: [
        ['Id_pago' , 'DESC']
      ],
    });
    return cuotas;
  };



  let findCuotasPagadasVerificacion = async (params) => {
    let fecha =  moment(params.fechaCorte)
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Id_cuenta_corriente: params.idCuentaCorriente},
          { Id_tipo_pago: { [Op.in]: [3, 4, 6] }},
          { Id_status_transaccion: 1},
          // { Id_status_pago: 3},
          { Categoria: "Principal"},
          { Fecha_limite_pago: { [Op.lt]: fecha } }
        ]
      },
    });
    return cuotas;
  };


  let finCuotasPorPagar = async (params) => {
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Id_cuenta_corriente: params.idCuentaCorriente},
          { Id_status_pago: { [Op.in]: [1, 2] }},
          { Id_tipo_pago: { [Op.in]: [3, 4, 6] }},
          { Id_status_transaccion: 1},
          { Fecha_limite_pago: { [Op.gt]: new Date(params.fechaCorte) } }
        ]
      },
    });
    return cuotas;
  };


  let finCuotasVencidas = async (params) => {
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Id_cuenta_corriente: params.idCuentaCorriente},
          { Id_status_pago: { [Op.in]: [1, 2] }},
          { Id_tipo_pago: 3 },
          { Id_status_transaccion: 1},
          { Categoria: "Principal"},
          { Fecha_limite_pago: { [Op.lt]: new Date(params.fechaCorte) } }
        ]
      },
    });
    return cuotas;
  };
  


  let findOneCuotasVencidas = async (params) => {
    console.log(params);
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Referencia: params },
          { Id_status_pago: 5},
          { Id_status_transaccion: 1},
        ]
      },
    });
    return cuotas;
  };

  let findOneMorasVencidas = async (params) => {
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Referencia: params },
          { Id_tipo_pago: 4},
          { Id_status_transaccion: 1},
        ]
      },
      order: [
        ['Id_pago' , 'DESC']
      ],
    });
    return cuotas;
  };

  let findOneInteresVencidas = async (params) => {
    const cuotas = await db.models.PAGO.findAll({ 
      where: {
        [Op.and]: [
          { Referencia: params },
          { Id_tipo_pago: 6},
          { Id_status_transaccion: 1},
        ]
      },
      order: [
        ['Id_pago' , 'DESC']
      ],
    });
    return cuotas;
  };

  let findOnePagoEnganche = async (params) => {
    const cuotas = await db.models.PAGO.findOne({ 
      where: {
         Id_cuenta_corriente: params,
           Id_tipo_pago: 2,
           Id_status_transaccion: 1,
           Categoria: "Secundaria",
      },
    });
    return cuotas;
  };
  

   return {
    createCuotas,
    findCuentaCorriente,
    updatePorcentajeEnganche,
    findOneCotizacion,
    pagoRealizado,
    findOneCuota,
    findAllCuota,
    desabilitarCuota,
    pagoCuota,
    findCuotasPagadas,
    findOneCuotasReferencia,
    finCuotasPorPagar,
    finCuotasVencidas,
    findOneCuotasVencidas,
    findOneMorasVencidas,
    findOneInteresVencidas,
    findCuotasPagadasVerificacion,
    findOnePagoEnganche
  };
};

module.exports = userRepository();
