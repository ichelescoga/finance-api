const establecimientoService = require("../services/establecimientoService");

exports.listEstablecimiento = async (req, res, next) => {
  try {
    let results = await establecimientoService.findEstablecimiento();
    const longitud = results.length;
    const banks = results.map(e => ({name: e["dataValues"]["Nombre"], id: e["dataValues"]["Id_establecimiento"]}))

    res.status(200).json({
      success: true,
      data: banks,
      length: longitud
    });
  } catch (error) {
    next(error);
  }
};


exports.listFormasPago = async (req, res, next) => {
  try {
    let results = await establecimientoService.formaPago();
    const paymentTypes = results.map(e => ({name: e["dataValues"]["Nombre"], id: e["dataValues"]["Id_forma_pago"]}))
    const longitud = results.length;

    res.status(200).json({
      success: true,
      data: paymentTypes,
      length: longitud,
    });

  } catch (error) {
    next(error);
  }
};