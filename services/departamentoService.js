const db = require("../src/models");
  
  let userRepository = function () {

    let findDepartamentos = async () => {
        const departamentos = await db.models.DEPARTAMENTO.findAll({
        });
        return departamentos;
      };
  
    return {
        findDepartamentos,
    };
  };
  
  module.exports = userRepository();
  