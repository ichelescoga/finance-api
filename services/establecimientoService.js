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

  let bankById = async (id) => {
    const bank = await db.models.ESTABLECIMIENTO.findOne({
      where: { Id_establecimiento: id }
    })
    return bank;
  }
  
  let paymentTypeByID = async (id) => {
    const bank = await db.models.FORMA_PAGO.findOne({
      where: { Id_forma_pago: id }
    })
    return bank;

  }
  return {
    findEstablecimiento,
    formaPago,
    bankById,
    paymentTypeByID
  };


};

module.exports = userRepository();
