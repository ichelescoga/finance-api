const db = require("../src/models");

let userRepository = function () {
 


  let createEjecutivo = async (params) => {
    const newEjecutivo = await db.models.EJECUTIVO.create({
        Id_ent_financiera: params.idEntFinanciera,
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
        Id_plan_financiero: params.idPlanFinanciero,
        Id_puesto: params.idPuesto,
        
    });
    return newEjecutivo;
  };

  let findEjecutivos = async () => {
    const listEjecutivos = await db.models.EJECUTIVO.findAll({
    });
    return listEjecutivos;
  };

    

  return { 
    createEjecutivo,
    findEjecutivos
  };
};

module.exports = userRepository();
