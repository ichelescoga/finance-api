const db = require("../src/models");

let userRepository = function () {
 


  let createPlanFinancieroProy = async (params) => {
    const newPlanFinanciero = await db.models.PLAN_FINANCIERO_PROY.create({
        Id_ent_financiera: params.idEntFinanciera,
        Id_tipo_credito: params.idTipoCredito,
        Tasa_interes: params.tasaInteres,
        Meses_maximo: params.mesesMaximo,
        Pagos_especiales: params.pagosEspeciales,
        Enganche_minimo: params.engancheMinimo,
        Id_proyecto: params.idProyecto,
        Id_empresa: params.idEmpresa,

    });
    return newPlanFinanciero;
  };


    

  return { 
    createPlanFinancieroProy
  };
};

module.exports = userRepository();
