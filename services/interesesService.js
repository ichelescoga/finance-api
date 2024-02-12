const db = require("../src/models");

let userRepository = function () {


  let findPorcentajesInterese = async (params) => {
    const cotizacion = await db.models.DETALLE_PORCENTAJE_INTERES.findAll({
      where: { 
        Id_proyecto: params,
        Status: 1
     },
    });
    return cotizacion;
  };


  let createDetallInteres = async (params) => {
    const newPorcentajeInteres = await db.models.DETALLE_PORCENTAJE_INTERES.create({
      Fecha_inicial: params.fechaInicial,
      Fecha_final: params.fechaFinal,
      Id_proyecto: params.idProyecto,
      Status: params.status,
      Porcentaje: params.porcentaje,
    });
    return newPorcentajeInteres;
  };



  let updatePorcentajeInteres = async (params) => {
    const porcentajeInteres = await db.models.DETALLE_PORCENTAJE_INTERES.findOne({
      where: { Id_detalle_porcentaje_Interes: params.idDetallePorcentajeInteres }
    });

    if (!porcentajeInteres) {
      return
    } else {
      await db.models.DETALLE_PORCENTAJE_INTERES.update({
        Fecha_inicial: params.fechaInicial,
        Fecha_final: params.fechaFinal,
        Id_proyecto: params.idProyecto,
        Status: params.status,
        Porcentaje: params.porcentaje,
      }, {
        where: { Id_detalle_porcentaje_Interes: params.idDetallePorcentajeInteres }
      });
    }
    const detallePorcentajeActualizado = await db.models.DETALLE_PORCENTAJE_INTERES.findOne({
      where: { Id_detalle_porcentaje_Interes: params.idDetallePorcentajeInteres }
    });
    return detallePorcentajeActualizado
  };

  return {

    findPorcentajesInterese,
    createDetallInteres,
    updatePorcentajeInteres
  };
};

module.exports = userRepository();
