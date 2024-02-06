const db = require("../src/models");
  
  let userRepository = function () {



    // let boletasAprobadas = async (params) => {
    //     const cotizacion = await db.models.COTIZACION.findOne({
    //       include: [
    //         {
    //           model: db.models.UNIDAD_COTIZACION,
    //           as: "UNIDAD_COTIZACIONs",
    //           attributes: ["Id_unidad_cotizacion"],
    //           required: true,
    //           include: [
    //             {
    //               model: db.models.UNIDAD,
    //               as: "Id_unidad_UNIDAD",
    //               attributes: ["Id_unidad"],
    //               required: true,
    //               include: [
    //                 {
    //                   model: db.models.PROYECTO,
    //                   as: "Id_proyecto_PROYECTO",
    //                   attributes: ["Id_proyecto"],
    //                   required: true,
    //                   include: [
    //                     {
    //                       model: db.models.CONFIGURACION_DESCUENTO,
    //                       as: "CONFIGURACION_DESCUENTOs",
    //                       required: true,
    //                       include: [
    //                           {
    //                               model: db.models.TEMPORADA_DESCUENTO,
    //                               where: { Status : 1},
    //                               as: "Id_temporada_descuento_TEMPORADA_DESCUENTO",
    //                               required: true
    //                           },
    //                       ], 
    //                     },
    //                   ],
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     });
    //     return cotizacion;
    //   };
  

      let listClientes = async (params) => {
        console.log(params);
        const clientes = await db.models.CLIENTE.findAll({
            include: [
                {
                    model: db.models.COTIZACION,
                    as: "COTIZACIONs",
                    required: true,
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
                                  where: { Id_proyecto: params.idProyecto},
                                  required: true,
                                },
                              ],
                            },
                          ],
                        },{
                            model: db.models.BOLETA_PAGO,
                            as: "BOLETA_PAGOs",
                            where: { Id_status_pago: params.idStatusPago},
                            required: true,
                        }
                      ],
                }
            ], 
        });
        return clientes;
      };


  return {
    listClientes,
};
};

module.exports = userRepository();