const db = require("../src/models");
  
  let userRepository = function () {

    let listTipoProyectos = async () => {
        const tipoProyecto = await db.models.TIPO_PROYECTO.findAll({
        });
        return tipoProyecto;
      };
  
    return {
        listTipoProyectos,
    };
  };
  
  module.exports = userRepository();
  