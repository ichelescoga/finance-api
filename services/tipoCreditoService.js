const db = require("../src/models");
  
  let userRepository = function () {

    let findtipoCreditos = async () => {
        const tiposCredito = await db.models.TIPO_CREDITO.findAll({
        });
        return tiposCredito;
      };
  
    return {
        findtipoCreditos,
    };
  };
  
  module.exports = userRepository();
  