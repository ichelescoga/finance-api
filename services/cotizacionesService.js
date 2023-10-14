const db = require("../src/models");

  
  let userRepository = function () {

    let listaCotizaciones = async () => {
      const cotizaciones = await db.models.COTIZACION.findAll({
      });
      return cotizaciones;
    };

    let creatCotizacion = async (params) => {
      const newCotizacion = await db.models.COTIZACION.create({
        Id_detalle_asesor: params.idDetalleAsesor,
        Id_estado: params.idEstado,
        Id_plan_financiero: params.idPlanFinanciero,
        Id_cliente: params.idCliente,
        Fecha: params.fecha,
        Fecha_hora: params.fechaHora,
        Ingreso_mensual: params.ingresoMensual,
        Enganche: params.enganche,
        Meses_plazo: params.mesesPlazo,
        Mes_inicio: params.mesInicio,
        Anio_inicio: params.anioInicio,
        Mes_fin: params.mesFin,
        Anio_fin: params.anioFin,
        Descuento: params.descuento,
        Venta_descuento: params.ventaDescuento,
        Precio_contado: params.precioContado,
        Aguinaldo: params.aguinaldo,
        Bono_catorce: params.bonoCatorce,
        Url_cotizacion: params.urlCotizacion,
        Comentario: params.comentario
      });
      return newCotizacion;
    };

    let updateCotizacion = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });

      if(!cotizacion) {
         return
      } else {
          await db.models.COTIZACION.update({
          Id_detalle_asesor: params.idDetalleAsesor,
          Id_estado: params.idEstado,
          Id_plan_financiero: params.idPlanFinanciero,
          Id_cliente: params.idCliente,
          Fecha: params.fecha,
          Fecha_hora: params.fechaHora,
          Ingreso_mensual: params.ingresoMensual,
          Enganche: params.enganche,
          Meses_plazo: params.mesesPlazo,
          Mes_inicio: params.mesInicio,
          Anio_inicio: params.anioInicio,
          Mes_fin: params.mesFin,
          Anio_fin: params.anioFin,
          Descuento: params.descuento,
          Venta_descuento: params.ventaDescuento,
          Precio_contado: params.precioContado,
          Aguinaldo: params.aguinaldo,
          Bono_catorce: params.bonoCatorce,
          Url_cotizacion: params.urlCotizacion,
          Comentario: params.comentario
        },{
          where:{
            Id_cotizacion: params.id
          }
      });
      }
      const cotizacionActualizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });
      return cotizacionActualizada
    };

    let createCotizacion_Unidad = async (params) => {
      const newCotizacionUnidad = await db.models.UNIDAD_COTIZACION.create({
        Id_cotizacion: params.idCotizacion,
        Id_unidad: params.idUnidad,
      });
      return newCotizacionUnidad;
    };

    let finCotizacionUnidad = async (params) => {
      const unidadCotizacion = await db.models.UNIDAD_COTIZACION.findAll({
        where: {Id_unidad: params.idUnidad},
        include: [
          {
            model: db.models.COTIZACION,
            as: "Id_cotizacion_COTIZACION",
            required: true,
            include: [
              {
                model: db.models.ASESOR_DETALLE,
                as: "Id_detalle_asesor_ASESOR_DETALLE",
                where: {Id_empleado: params.idEmpleadoAsesor},
                required: true,
                attributes: ["Id_detalle_asesor"],
              },
              {
                model: db.models.CLIENTE,
                as: "Id_cliente_CLIENTE",
              },
            ],
          },
        ],
      })
      return unidadCotizacion;
    };

    let findOneCotizacion = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({ 
        where: { Id_cotizacion: params },
        include: [
          {
            model: db.models.CLIENTE,
            as: "Id_cliente_CLIENTE",
          },
        ],
      });
      return cotizacion;
    };


    let listCotizCotizadasRechazada = async (idProyecto) => {
      const Op = db.Sequelize.Op;
      const cotizaciones = await db.models.COTIZACION.findAll({
        where: {
          [Op.or]: [
            { Id_estado: 2 },
            { Id_estado: 6 }
          ]
        },
        include: [
          {
            model: db.models.CLIENTE,
            as: "Id_cliente_CLIENTE",
          },
          {
            model: db.models.ESTADO,
            as: "Id_estado_ESTADO",
          },
          {
            model: db.models.APLICACION,
            as: "APLICACIONs",
          },
          {
            model: db.models.UNIDAD_COTIZACION,
            as: "UNIDAD_COTIZACIONs",
            required:true,
            include: [
              {
                model: db.models.UNIDAD,
                as: "Id_unidad_UNIDAD",
                required:true,
                where: {
                  Id_proyecto: idProyecto
                }
              },
            ],
          },
          {
            model: db.models.PLAN_FINANCIERO_PROY,
            as: "Id_plan_financiero_PLAN_FINANCIERO_PROY",
          },
          {
            model: db.models.ASESOR_DETALLE,
            as: "Id_detalle_asesor_ASESOR_DETALLE",
            include: [
              {
                model: db.models.EMPLEADO_ASESOR,
                as: "Id_empleado_EMPLEADO_ASESOR",
              },
            ],
          },
        ],
      });
      return cotizaciones;
    };


    let listCotizAprovadoReservado = async (params) => {
      const Op = db.Sequelize.Op;
      const cotizaciones = await db.models.COTIZACION.findAll({
        where: {
          [Op.or]: [
            { Id_estado: 5},
            { Id_estado: 7 }
          ]
        },
        include: [
          {
            model: db.models.ASESOR_DETALLE,
            as: "Id_detalle_asesor_ASESOR_DETALLE",
            where: {Id_empleado: params.idEmpleadoAsesor},
            required: true,
            include: [
              {
                model: db.models.EMPLEADO_ASESOR,
                as: "Id_empleado_EMPLEADO_ASESOR",
              },
            ],
          },
          {
            model: db.models.CLIENTE,
            as: "Id_cliente_CLIENTE",
          },
          {
            model: db.models.ESTADO,
            as: "Id_estado_ESTADO",
          },
          {
            model: db.models.APLICACION,
            as: "APLICACIONs",
          },
          {
            model: db.models.UNIDAD_COTIZACION,
            as: "UNIDAD_COTIZACIONs",
            include: [
              {
                model: db.models.UNIDAD,
                as: "Id_unidad_UNIDAD",
              },
            ],
          },
          {
            model: db.models.PLAN_FINANCIERO_PROY,
            as: "Id_plan_financiero_PLAN_FINANCIERO_PROY",
          },
        ],
      });
      return cotizaciones;
    };


    let updateCotizacionVendida = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({ 
        where: { Id_cotizacion: params.id },
        include: [
          {
            model: db.models.UNIDAD_COTIZACION,
            as: "UNIDAD_COTIZACIONs",
            include: [
              {
                model: db.models.UNIDAD,
                as: "Id_unidad_UNIDAD",
              },
            ],
          },
        ],
      },);

      if(!cotizacion && cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_unidad) {
         return
      } else {


      await db.models.COTIZACION.update({
          Id_estado: params.idEstado,
        },{
          where:{
            Id_cotizacion: params.id
          }
      });
      await db.models.UNIDAD.update({
        Id_estado: params.idEstado,
      },{
        where:{
          Id_unidad: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_unidad
        }
    });
      }
      const cotizacionActualizada  = await db.models.COTIZACION.findOne({ 
        where: { Id_cotizacion: params.id },
        include: [
          {
            model: db.models.UNIDAD_COTIZACION,
            as: "UNIDAD_COTIZACIONs",
            include: [
              {
                model: db.models.UNIDAD,
                as: "Id_unidad_UNIDAD",
                include: [
                  {
                    model: db.models.ESTADO,
                    as: "Id_estado_ESTADO",
                  },
                ],
              },
            ],
          },
          {
            model: db.models.ESTADO,
            as: "Id_estado_ESTADO",
          }
        ],
      },);
      return cotizacionActualizada
    };
  


    let updateCotizEstado = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });

      if(!cotizacion) {
         return
      } else {
          await db.models.COTIZACION.update({
          Id_estado: params.idEstado,
          Comentario: params.comentario
        },{
          where:{
            Id_cotizacion: params.id
          }
      });
      }
      const cotizacionActualizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.id } });
      return cotizacionActualizada
    };


    let findOneCotizacionpdf = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({
        where: { Id_cotizacion: params},
        include: [
          {
            model: db.models.ASESOR_DETALLE,
            as: "Id_detalle_asesor_ASESOR_DETALLE",
            include: [
              {
                model: db.models.EMPLEADO_ASESOR,
                as: "Id_empleado_EMPLEADO_ASESOR",
              },
            ],
          },
          {
            model: db.models.CLIENTE,
            as: "Id_cliente_CLIENTE",
            include: [
              {
                model: db.models.PAIS,
                as: "Id_nacionalidad_PAI",
              },
            ],
          },
          {
            model: db.models.ESTADO,
            as: "Id_estado_ESTADO",
          },
          {
            model: db.models.APLICACION,
            as: "APLICACIONs",
          },
          {
            model: db.models.UNIDAD_COTIZACION,
            as: "UNIDAD_COTIZACIONs",
            include: [
              {
                model: db.models.UNIDAD,
                as: "Id_unidad_UNIDAD",
              },
            ],
          },
          {
            model: db.models.PLAN_FINANCIERO_PROY,
            as: "Id_plan_financiero_PLAN_FINANCIERO_PROY",
          },
        ],
      });
      return cotizacion;
    };

    let findOneInfoPreventapdf = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({
        attributes: ["Id_cotizacion"],
        where: { Id_cotizacion: params},
        include: [
          {
            model: db.models.CLIENTE,
            as: "Id_cliente_CLIENTE",
            include: [
              {
                model: db.models.PAIS,
                as: "Id_nacionalidad_PAI",
              },
            ],
          },
          {
            model: db.models.UNIDAD_COTIZACION,
            as: "UNIDAD_COTIZACIONs",
            include: [
              {
                model: db.models.UNIDAD,
                as: "Id_unidad_UNIDAD",
              },
            ],
          },
        ],
      });
      return cotizacion;
    };



    let descuentoCotizacion = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({
        where: { Id_cotizacion: params},
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
                        model: db.models.CONFIGURACION_DESCUENTO,
                        as: "CONFIGURACION_DESCUENTOs",
                        required: true,
                        include: [
                            {
                                model: db.models.TEMPORADA_DESCUENTO,
                                where: { Status : 1},
                                as: "Id_temporada_descuento_TEMPORADA_DESCUENTO",
                                required: true
                            },
                        ], 
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


    let updateDescuento = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.idCotizacion } });

      if(!cotizacion) {
         return
      } else {
          await db.models.COTIZACION.update({
          Descuento: params.descuento,
          Venta_descuento: params.totalDescuento,
          Solicitud_descuento: params.solicitudDescuento,
          Estado_descuento: params.estadoDescuento,
        },{
          where:{
            Id_cotizacion: params.idCotizacion
          }
      });
      }
      const cotizacionActualizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params.idCotizacion } });
      return cotizacionActualizada
    };
    

    return {
        listaCotizaciones,
        creatCotizacion,
        finCotizacionUnidad,
        createCotizacion_Unidad,
        findOneCotizacion,
        updateCotizacion,
        listCotizCotizadasRechazada,
        listCotizAprovadoReservado,
        updateCotizacionVendida,
        updateCotizEstado,
        findOneCotizacionpdf,
        findOneInfoPreventapdf,
        descuentoCotizacion,
        updateDescuento

    };
  };
  
  module.exports = userRepository();
  