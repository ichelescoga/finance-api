const db = require("../src/models");
  
  let userRepository = function () {

    let listPuestos = async () => {
        const puesto = await db.models.PUESTO.findAll({
        });
        return puesto;
      };
  
    return {
        listPuestos,
    };
  };
  
  module.exports = userRepository();
  