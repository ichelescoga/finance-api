const db = require("../src/models");

let userRepository = function () {


  let findPorcentajesInterese = async (params) => {
    const cotizacion = await db.models.DETALLE_PORCENTAJE_INTERES.findAll({
      where: { Id_proyecto: params },
    });
    return cotizacion;
  };

  return {

    findPorcentajesInterese,
  };
};

module.exports = userRepository();
