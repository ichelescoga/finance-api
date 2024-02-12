const intereseService = require("../services/interesesService");

exports.listPorcentajesInteres = async (req, res, next) => {
    try {
      let results = await intereseService.findPorcentajesInterese(req.params.id);
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay Detalles de porcentaje de Intereses para este proyecto Registradas",
        });
      }
    } catch (error) {
      next(error);
    }
  };