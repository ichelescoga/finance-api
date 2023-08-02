const db = require("../src/models");
  
  let userRepository = function () {

    let findMunicipios = async () => {
        const municipios = await db.models.MUNICIPIO.findAll({
        });
        return municipios;
      };
  
    return {
        findMunicipios,
    };
  };
  
  module.exports = userRepository();
  