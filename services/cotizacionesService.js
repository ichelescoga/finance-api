const db = require("../src/models");
  
  let userRepository = function () {

    let listaCotizaciones = async () => {
      const cotizaciones = await db.models.COTIZACION.findAll({
      });
      return cotizaciones;
    };
    
  
  
    return {
        listaCotizaciones
    };
  };
  
  module.exports = userRepository();
  