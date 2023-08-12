

const db = require("../src/models");
  
  let userRepository = function () {

    
    let createUnidad = async (params) => {
      const newUnidad = await db.models.UNIDAD.create({
        Id_estado: params.idEstado,
        Id_proyecto: params.idProyecto,
        Nombre_unidad: params.nombreUnidad,
        Precio_Venta: params.precioVenta,
      });
      return newUnidad;
    };

    let findUnidadesProyecto = async (params) => {
      console.log(params);
      const unidadesProyect = await db.models.PROYECTO.findAll({
        where: {Id_proyecto: params.idProyecto},
        attributes: ["Id_proyecto"],
        include: [
          {
            model: db.models.UNIDAD,
            as: "UNIDADs",
            // include: [
            //   {
            //     model: db.models.UNIDAD_COTIZACION,
            //     as: "UNIDAD_COTIZACIONs",
            //     attributes: ["Id_unidad_cotizacion"],
            //     include: [
            //       {
            //         model: db.models.COTIZACION,
            //         as: "Id_cotizacion_COTIZACION",
            //         attributes: ["Id_cotizacion"],
            //         include: [
            //           {
            //             model: db.models.ASESOR_DETALLE,
            //             as: "Id_detalle_asesor_ASESOR_DETALLE",
            //             where: {Id_empleado: params.idEmpleadoAsesor},
            //             required: true,
            //             attributes: ["Id_detalle_asesor"],
            //           },
            //         ],
            //       },
            //     ],
            //   },
            // ],
          },
        ],
      })
      return unidadesProyect;
    };

    let findOneUnidad = async (params) => {
      const unidad = await db.models.UNIDAD.findOne({ where: { Id_unidad: params } });
      return unidad;
    };
  
    return {
        findUnidadesProyecto,
        createUnidad,
        findOneUnidad
    };
  };
  
  module.exports = userRepository();
  