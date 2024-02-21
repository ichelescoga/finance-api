const db = require("../src/models");
  
  let userRepository = function () {

    let findEstablecimiento = async (id) => {
        const establecimiento = await db.models.ESTABLECIMIENTO.findAll({
        });
        return establecimiento;
      };
  
      let formaPago = async (id) => {
        const formasPago = await db.models.FORMA_PAGO.findAll({
        });
        return formasPago;
      };
    return {
        findEstablecimiento,
        formaPago
    };
  };
  
  module.exports = userRepository();
  