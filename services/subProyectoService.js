

const db = require("../src/models");
  
  let userRepository = function () {

    
    let createSubProyecto = async (params) => {
      const newEmpresa = await db.models.SUB_PROYECTO.create({
        Id_proyecto: params.idProyecto,
        Cantidad_unidades: params.cantidadUnidades,
        Fecha_inicio_venta: params.fechaInicioVenta,
        Fecha_fin_venta: params.fechaFinVenta,
        Costo_promedio_unidad: params.costoPromedioUnidad,
        Costo_total_venta: params.costoTotalVenta,
        Logo_proyecto: params.logoProyecto,
        Descripcion: params.descripcion,
      });
      return newEmpresa;
    };

  
    return {
        createSubProyecto,
    };
  };
  
  module.exports = userRepository();
  