const establecimientoService = require("../services/establecimientoService");

exports.listEstablecimiento = async (req, res, next) => {
    try {
        let results = await establecimientoService.findEstablecimiento();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay Establecimientos Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };


  exports.listFormasPago = async (req, res, next) => {
    try {
        let results = await establecimientoService.formaPago();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay formas pago Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };