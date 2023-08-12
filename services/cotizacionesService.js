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


    
  
  
    return {
        listaCotizaciones,
        creatCotizacion
    };
  };
  
  module.exports = userRepository();
  