const db = require("../src/models");
  
  let userRepository = function () {

    let findMunicipios = async (id) => {
        const municipios = await db.models.MUNICIPIO.findAll({
          where : {
            Id_departamento: id
          }
        });
        return municipios;
      };
  
    return {
        findMunicipios,
    };
  };
  
  module.exports = userRepository();
  