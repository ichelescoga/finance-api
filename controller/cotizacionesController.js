const cotizaciones = require("../services/cotizacionesService");
exports.listCotizaciones = async (req, res, next) => {
    try {
        let results = await cotizaciones.listaCotizaciones();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay cotizaciones Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };