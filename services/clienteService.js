const db = require("../src/models");
  
  let userRepository = function () {

    let listClientes = async () => {
      const clientes = await db.models.CLIENTE.findAll({
      });
      return clientes;
    };
    
  
  
    return {
        listClientes
    };
  };
  
  module.exports = userRepository();
  