const db = require("../src/models");
  
  let userRepository = function () {

    let listAsesores = async () => {
        const asesores = await db.models.ASESOR_DETALLE.findAll({
            include: [
                {
                  model: db.models.EMPLEADO_ASESOR,
                  as: "Id_empleado_EMPLEADO_ASESOR",
                  include: [
                    {
                      model: db.models.PUESTO,
                      as: "Id_puesto_PUESTO",
                    },
                  ],
                }
              ],
        });
        return asesores;
      };
  
    
    let createAsesor = async (params) => {
    const newAsesor = await db.models.EMPLEADO_ASESOR.create({
        Id_empleado: params.idEmpleado,
        Primer_nombre: params.primerNombre,
        Segundo_nombre: params.segundoNombre,
        Otros_nombres: params.otrosNombres,
        Primer_apellido: params.primerApellido,
        Segundo_apellido: params.segundoApellido,
        Apellido_casada: params.apellidoCasada,
        DPI: params.dpi,
        NIT: params.nit,
        Telefono: params.telefono,
        Correo: params.correo,
        Foto: params.foto,
        Id_puesto: params.idPuesto,
        Interno: params.interno,
    });

    return newAsesor;
    };

    let createAsesorDetalle = async (params) => {
        const newAsesorDetalle = await db.models.ASESOR_DETALLE.create({
            Id_detalle_asesor: params.idDetalleAsesor,
            Id_sub_proyecto: params.idSubProyecto,
            Id_empleado: params.idEmpleado,
            Comision: params.comision,
            Meta_vental: params.metaVenta,
        });
    
        return newAsesorDetalle;
        };

    return {
        listAsesores,
        createAsesor,
        createAsesorDetalle
    };
  };
  
  module.exports = userRepository();
  