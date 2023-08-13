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
            ],
          },
        ],
      })
      return unidadCotizacion;
    };

    let findOneCotizacion = async (params) => {
      const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params } });
      return cotizacion;
    };

  
    return {
        listaCotizaciones,
        creatCotizacion,
        finCotizacionUnidad,
        createCotizacion_Unidad,
        findOneCotizacion,
        updateCotizacion
    };
  };
  
  module.exports = userRepository();
  