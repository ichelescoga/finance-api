const db = require("../src/models");
  
  let userRepository = function () {

    let findEntidadesFinancieras = async () => {
        const entidadesFinancieras = await db.models.ENTIDAD_FINANCIERA.findAll({
        });
        return entidadesFinancieras;
      };
  
    return {
        findEntidadesFinancieras,
    };
  };
  
  module.exports = userRepository();
  